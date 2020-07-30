const {Schema, model,Types} = require('mongoose');
const questionFillSchema = require('./QuestionsFill');
const fillQuizSchema = new Schema({
    title:{type:String},
    questions:[questionFillSchema],
    _userId:Types.ObjectId,
    totalPoints:{type:Number, default:0}
});

fillQuizSchema.pre('save',function(next){
    const quizFill = this;
    quizFill.totalPoints = quizFill.questions.filter(question=> question.answer.correct)
    .map(question => question.points)
    .reduce((a,b)=> a + b);
    next();
});
module.exports = model('FillQuiz',fillQuizSchema);
