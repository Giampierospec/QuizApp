 const QuizFill = require('../models/FillQuiz');
 const User = require('../models/User');
 const {PROPS_TO_FILTER} = require('../utils/stats.utils');

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

const getQuestions = async (req,res,next)=>{
    try {
        const quizFill = await QuizFill
                         .aggregate([
                             {
                                 $unwind:"$questions"
                             },
                             {
                                $group:{
                                    _id:'$questions.question',
                                    count:{$sum:1}
                                }

                             },
                         ]);
        res.send(quizFill);
    } catch (e) {
        res.status(400).send(e);
    }
}




module.exports = {
    getQuizStats,
    getQuestions
};