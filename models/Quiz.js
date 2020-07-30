const {Schema,model,Types} = require('mongoose');
const Questions = require('./Questions');
const quizSchema = new Schema({
    title:{type:String, required:true, trim:true},
    questions:[Questions],
    created:{type:Date, default:new Date()},
    totalPoints:{type:Number, default:0},
    _userId: Types.ObjectId
});

quizSchema.pre('save',function(next){
    const quiz = this;
    quiz.totalPoints = quiz.questions.map(question => question.points).reduce((a,b)=> a+b);
    next();
})
module.exports = model('Quiz',quizSchema);