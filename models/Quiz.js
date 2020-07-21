const {Schema,model,Types} = require('mongoose');
const Questions = require('./Questions');
const quizSchema = new Schema({
    title:{type:String, required:true},
    questions:[Questions],
    _userId: Types.ObjectId
});

module.exports = model('Quiz',quizSchema);