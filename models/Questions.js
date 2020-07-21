const {Schema} = require('mongoose');
const answerSchema = require('./Answers');
const questionSchema = new Schema({
    question:{type:String},
    options:[answerSchema],
    points:{type:Number}
});

module.exports = questionSchema;