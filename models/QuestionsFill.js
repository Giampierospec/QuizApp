const {Schema} = require('mongoose');

const questionFillSchema = new Schema({
    question: { type: String },
    answer: {
        description: String,
        correct: Boolean
    },
    points: { type: Number }
});
module.exports = questionFillSchema;