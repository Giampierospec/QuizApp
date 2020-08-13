 const QuizFill = require('../models/FillQuiz');
 const User = require('../models/User');
 const {PROPS_TO_FILTER} = require('../utils/stats.utils');
 const _ = require('lodash');

const mapUser = async (item = {})=>{
    const user = await User.findById(item._id);
    return {
        _id: user.name,
        count:item.count
    };
}

const mapUsers = (arr = [])=>{
    return Promise.all(arr.map(item=> mapUser(item)));
}

const getQuizStats = async (req,res,next)=>{
    try {
        const {key} = req.query;
        let filledQuizzes = await QuizFill
        .aggregate(
            [
                {
                    $group:{
                        _id:PROPS_TO_FILTER[key],
                        count:{$sum:1}
                    }
                }
                
            ]
        );
        if(key === "user" )
            filledQuizzes = await mapUsers(filledQuizzes);
            
        res.send(filledQuizzes);
        
    } catch (e) {
        res.status(400).send(e);
    }
}
const groupBy = (objectArray,property)=>{
    return objectArray.reduce((acc,obj)=>{
        let key = obj[property];
        if(!acc[key])
            acc[key]=[];
        
        acc[key].push(obj);
        return acc;
    },{})
}
const getQuestions = async (req,res,next)=>{
    try {
        const {title}  = req.query;
        const quizFill = await QuizFill.find({title});
        const titlesGrouped = groupBy(quizFill,'title');
        const questions = titlesGrouped[title].map(item=> item.questions).reduce((a,b)=>a.concat(b));
        const questionsGrouped = groupBy(questions,'question');
        res.send(questionsGrouped);
    } catch (e) {
        res.status(400).send(e);
    }
}
const getTitles = async (req,res,next)=>{
    try {
        const titles = await QuizFill.find({}).select('title');
        res.send(titles);
    } catch (e) {
        res.status(400).send(e);
    }
}




module.exports = {
    getQuizStats,
    getQuestions, 
    getTitles
};