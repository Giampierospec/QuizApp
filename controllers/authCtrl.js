const User = require('../models/User');
const ACCEPTED = [
    'admin',
    'super'
];
/**
 * Check if user is authenticated
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.session.token;
        const user = await User.findByToken(token);
        if (!user)
            return res.status(404).send('User not found');
        req.user = user.toJSON();
        next();

    }
    catch (e) {
        return res.status(401).send('Not Logged in');
    }

}
const isAdmin = async (req, res, next) => {
    if (ACCEPTED.some(role => role === req.user.role))
        return next();

    return res.status(401).send('Not an admin to enter this view');

}
const isSuperUser = async (req, res, next) => {
    if (req.user.role !== 'super')
        return res.status(401).send('Not a super user to enter this view');

    next();
}
/**
 * Logins the user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (req.session.token)
            return res.status(405).send('Already logged in');

        const user = await User.findByCredentials(email, password);
        req.session.token = await user.generateAuthToken();
        return res.send(user.toJSON());

    }
    catch (e) {
        return res.status(400).send(e);
    }
};
const logout = (req, res, next) => {
    req.session = null;
    return res.send(null);
};
/**
 * Create user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createUser = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;
        let user = await User.findOne({ email });
        if (user)
            return res.status(400).send('User already exists');
        user = new User({
            name,
            email,
            password
        });
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
const getCurrentUser = (req, res, next) => {
    res.send(req.user);
};

const getUsers = async (req, res, next) => {
    try {
        res.send(await User.find({}).select({
            name: 1,
            email: 1
        }));
    } catch (e) {
        res.status(400).send(e);
    }
}
const changeRole = async (req, res, next) => {
    try {
        const { idUser, role } = req.body;
        let user = await User.findById(idUser);
        user.role = role;
        user = await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
}






module.exports = {
    isAuthenticated,
    getCurrentUser,
    loginUser,
    createUser,
    logout,
    isAdmin,
    getUsers,
    changeRole,
    isSuperUser
};