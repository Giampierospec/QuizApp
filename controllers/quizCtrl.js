const FillQuiz = require('../models/FillQuiz');
const Quiz = require('../models/Quiz');
const {body, validationResult} = require('express-validator');
/**
 * Gets the quizzes the user has filled
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getFilledQuizzes = async (req,res,next)=>{
    try{
        const fillQuiz = await FillQuiz.find({ _userId: req.user._id });
        return res.send(fillQuiz);
    }
    catch(e){
        res.status(400).send(`Couldn't load Quizzes for user ${req.user.name}`);
    }

};
const validate = (method)=>{
  try{
      switch (method) {
          case 'createQuizzes': {
              return [
                  body('title', 'Title is required').notEmpty(),
                  body('questions', 'Must have at least one question').isArray().isLength({ min: 1 })
              ]
          }
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
const getQuizzesToFill = (req,res,next)=>{
    try {
        res.send(await Quiz.find());
    } catch (e) {
        res.status(400).send(e);
    }
}
const getQuizzes = (req,res,next)=>{
    try{
        res.send(await Quiz.find({_userId:req.user._id}));
    }catch(err){
        res.status(400).send(err);
    }
}

const getQuizToFill = (req,res,next)=>{
    const {id} = req.params.id;
    try {
        return (await Quiz.findById(id));
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
    getQuizToFill
};