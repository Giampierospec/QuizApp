const {Schema, Types} = require('mongoose');

const questionFillSchema = new Schema({
    question:{type:String},
    answer: {type:Types.ObjectId},
    points: { type: Number }
});
module.exports = questionFillSchema;