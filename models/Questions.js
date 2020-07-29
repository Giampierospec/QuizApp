const {Schema} = require('mongoose');
const answerSchema = require('./Answers');
const questionSchema = new Schema({
    question:{type:String, trim:true, required:true},
    options:[answerSchema],
    points:{type:Number}
});

module.exports = questionSchema;