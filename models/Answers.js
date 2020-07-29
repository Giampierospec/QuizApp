const {Schema} = require('mongoose');

const answerSchema = new Schema({
    description:{type:String, trim:true, required:true},
    correct:{type:Boolean, default:false}
});

module.exports = answerSchema;