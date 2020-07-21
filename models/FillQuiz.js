const {Schema, model,Types} = require('mongoose');
const questionFillSchema = require('./QuestionsFill');
const fillQuizSchema = new Schema({
    title:{type:String},
    questions:[questionFillSchema],
    _userId:Types.ObjectId
});

module.exports = model('FillQuiz',fillQuizSchema);
