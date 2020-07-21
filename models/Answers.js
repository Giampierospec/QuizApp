const {Schema} = require('mongoose');

const answerSchema = new Schema({
    description:{type:String},
    correct:{type:Boolean, default:false}
});

module.exports = answerSchema;