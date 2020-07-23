const FillQuiz = require('../models/FillQuiz');
const Quiz = require('../models/Quiz');
const {body, validationResult} = require('express-validator');
/**
 * Gets the quizzes the user has filled
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getQuizzes = async (req,res,next)=>{
    try{
        const fillQuiz = await FillQuiz.find({ _userId: req.user._id });
        return res.send(fillQuiz);
    }
    catch(e){
        res.status(400).send(`Couldn't load Quizzes for user ${req.user.name}`);
    }

};
const validate = (method)=>{
  switch(method){
      case'createQuizzes':{
          return [
              body('title').notEmpty().withMessage('Title is required'),
              body('questions').isArray().isLength({min:1})
          ]
      }
  }  
};
const createQuizzes = async (req,res,next)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.send(400).send(errors.array().map(x => x.msg));
        
    } catch (e) {
        res.status(400).send(e);
    }
};



module.exports = {
    getQuizzes,
    createQuizzes,
    validate
};