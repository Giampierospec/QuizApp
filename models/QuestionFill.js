const {Schema, Types} = require('mongoose');

const questionFillSchema = new Schema({
    question:{type:String},
    answer: {
        correct:{type:Boolean, required:true},
        description:{type:String, required:true},
        correctAnswer:{type:String,required:true}
    },
    points: { type: Number }
});
module.exports = questionFillSchema;