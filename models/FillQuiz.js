const {Schema, model,Types} = require('mongoose');
const QuestionFillSchema = require('./QuestionFill');
const fillQuizSchema = new Schema({
    title:{type:String},
    questions:[QuestionFillSchema],
    _userId:Types.ObjectId,
    totalPoints:{type:Number, default:0},
    filled:{type:Boolean,default:true},
    maxPoints:{type:Number}
});

fillQuizSchema.pre('save',function(next){
    const quizFill = this;
    quizFill.totalPoints = quizFill.questions.filter(question=> question.answer.correct)
    .map(question => question.points)
    .reduce((a,b)=> a + b);
    next();
});
module.exports = model('FillQuiz',fillQuizSchema);
