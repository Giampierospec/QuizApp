const FillQuiz = require('../models/FillQuiz');

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



module.exports = {
    getQuizzes
};