const { Schema, model } = require('mongoose');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/keys');
const _ = require('lodash');

const SALT = 10;
const hash = promisify(bcrypt.hash);
const genSalt = promisify(bcrypt.genSalt);
const compare = promisify(bcrypt.compare);

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: 'normal' },
    password: { type: String },
    googleId: ""
});
/**
 * Before saving
 */
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const salt = await genSalt(SALT);
        const hashed = await hash(user.password, salt);
        user.password = hashed;
        next();
    }
    else
        next();
});
/**
 * Generates the auth token
 */
userSchema.methods.generateAuthToken = function(){
    const user = this;
    return jwt.sign({_id:user._id.toHexString(), role:user.role},jwtSecret);
};
userSchema.methods.toJSON = function(){
    const user = this;
    return _.pick(user,['_id','email','role','name'])
};
/**
 * Finds by token
 * @param {*} token 
 */
userSchema.statics.findByToken = function(token){
    const User = this;
    let decoded = undefined;
    try {
        decoded = jwt.verify(token,jwtSecret);
    }catch(e){
        return new Promise.reject(e);
    }
    return User.findOne({
        _id:decoded._id,
        role: decoded.role
    });
}
/**
 * static method to find credentials
 * @param {*} email 
 * @param {*} password 
 */
userSchema.statics.findByCredentials = async function(email,password){
    const User = this;
    const user = await User.findOne({email});
    if(!user)
        return Promise.reject('User does not exist');
    const correctPassword = await compare(password, user.password);
    return new Promise((resolve,reject)=>{     
        if(correctPassword)
            resolve(user);
        else
            reject('Password incorrect!');
    });

    
};

module.exports = model('User', userSchema)