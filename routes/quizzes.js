const express = require('express');
const router = express.Router();
const {isAuthenticated, isAdmin}  = require('../controllers/authCtrl');
const {getQuizzes,createQuizzes,validate, getFilledQuizzes, getQuizzesToFill} = require('../controllers/quizCtrl');
router.route('/quizFull')
       .get(isAuthenticated,getFilledQuizzes)

router.route('/quiz')
       .get(isAuthenticated,isAdmin,getQuizzes)
       .post(isAuthenticated,isAdmin,validate('createQuizzes'),createQuizzes)

module.exports = router;