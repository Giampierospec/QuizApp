const User = require('../models/User');
/**
 * Check if user is authenticated
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isAuthenticated = async (req,res,next)=>{
try{
    const token = req.session.token;
    const user = await User.findByToken(token);
    if(!user)
        return res.status(404).send('User not found');
    req.user = user;
    next();

}
catch(e){
    return res.status(401)('Not Logged in');
}

}
/**
 * Logins the user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const loginUser = async (req,res,next)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findByCredentials(email,password);
        req.session.token = await user.generateAuthToken();

        return res.send(user);

    }
    catch(e){
        return res.status(400).send(e);
    }
};
/**
 * Create user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createUser = async(req,res,next)=>{
    try {
        const { email, name, password } = req.body;
        let user = await User.findOne({ email });
        if(user)
            return res.status(400).send('User already exists');
        user = new User({
            name,
            email,
            password
        });
        req.session.token = await user.generateAuthToken();
        res.send(await user.save());
    } catch (e) {
        return res.status(400).send(e);
    }
}
/**
 * Gets the current user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getCurrentUser = (req,res,next)=>{
    res.send(req.user);
};






module.exports = {
    isAuthenticated,
    getCurrentUser,
    loginUser,
    createUser
};