const FillQuiz = require('../models/FillQuiz');
const Quiz = require('../models/Quiz');
const {body, validationResult} = require('express-validator');
const _ = require('lodash');
/**
 * Gets the quizzes the user has filled
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getFilledQuizzes = async (req,res,next)=>{
    try{
        const fillQuiz = await FillQuiz.find({ _userId: req.user._id }).select({_id:1,title:1,totalPoints:1, maxPoints:1});
        return res.send(fillQuiz);
    }
    catch(e){
        res.status(400).send(`Couldn't load Quizzes for user ${req.user.name}`);
    }

};
const validate = (method)=>{
  try{
      switch (method) {
          case 'createQuizzes': 
              return [
                  body('title', 'Title is required').notEmpty(),
                  body('questions', 'Must have at least one question').isArray().isLength({ min: 1 })
              ];
      }  
  }catch(e){
      return e;
  }
};
const createQuizzes = async (req,res,next)=>{
    try {
        const errors = validationResult(req);
        const {title, questions} = req.body;
        let quiz = await Quiz.findOne({title});
        if(quiz)
            return res.status(400).send(`The quiz with title ${title} already exists!`);
        if(!errors.isEmpty())
            return res.status(400).send(errors.array().map(x => x.msg));
        
         quiz = new Quiz({
            title,
            questions,
            _userId: req.user._id
        });
        res.send(await quiz.save());

        
        
    } catch (e) {
        res.status(400).send(e);
    }
};
const filterQuizzesToFill = async (arr,userId)=>{
    const filteredQuiz = [];
    for (const quiz of arr) {
        const filledQuiz = await FillQuiz.exists({title:quiz.quizTitle, _userId: userId, filled:true});
        if(!filledQuiz)
            filteredQuiz.push(quiz);
    }
    return filteredQuiz;
};

const getQuizzesToFill = async (req,res,next)=>{
    try {
        let quizzesToFill = await Quiz.find({});
        quizzesToFill = quizzesToFill.map((q) => ({ quizTitle: q.title, quizId: q._id }))
        res.send(await filterQuizzesToFill(quizzesToFill, req.user._id));
    } catch (e) {
        res.status(400).send(e);
    }
}
const getQuizzes = async (req,res,next)=>{
    try{
        res.send(await Quiz.find({_userId:req.user._id}));
    }catch(err){
        res.status(400).send(err);
    }
}
const getQuiz = async (req,res,next)=>{
    try {
        const {id} = req.params;
        res.send(await Quiz.findOne({_id:id, _userId:req.user._id}));
    } catch (e) {
        res.status(400).send(e);
    }
};
const getAnswer = (obj)=>{
    let answer = {}
    for([key,value] of Object.entries(obj))
        if(value.chosen)
            answer = value;
    if(_.isEmpty(answer))
        throw new Error("Answer is empty");
    
    return _.pick(answer,['description','correct']);
            
}
const fillQuiz = async (req,res,next)=>{
  try{
      let { title, questions, maxPoints } = req.body;
        questions = questions.map(question => {
            return {
                question: question.question,
                points: question.points,
                answer: getAnswer(question.answer)
            };
        });
      const filledQuiz = new FillQuiz({
          title,
          maxPoints,
          questions,
          _userId:req.user._id
      });
      const doc = await filledQuiz.save();
      res.send(doc);
  }
  catch(e){
      res.status(400).send(e.message);
  }


};
/**
 * Gets the specific quiz to fill
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getQuizToFill = async (req,res,next)=>{
    const {id} = req.params;
    try {
        const quiz = await Quiz.findById(id);
        res.send({
            title:quiz.title,
            maxPoints:quiz.totalPoints,
            totalPoints:0,
            questions: quiz.questions.map((question)=>({
                question:question.question,
                points:question.points,
                answer:{...question.options.map(opt=> ({correct:opt.correct, description:opt.description, chosen:false}))}
            }))
        });
    } catch (error) {
        res.status(400).send(error);
    }
};



module.exports = {
    getFilledQuizzes,
    createQuizzes,
    validate,
    getQuizzesToFill,
    getQuizzes,
    getQuiz,
    getQuizToFill,
    fillQuiz
};