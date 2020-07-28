const {Schema,model,Types} = require('mongoose');
const Questions = require('./Questions');
const quizSchema = new Schema({
    title:{type:String, required:true, trim:true},
    questions:[Questions],
    created:{type:Date, default:new Date()},
    _userId: Types.ObjectId
});

module.exports = model('Quiz',quizSchema);