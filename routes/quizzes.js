const express = require('express');
const router = express.Router();
const {isAuthenticated, isAdmin}  = require('../controllers/authCtrl');
const {getQuizzes,createQuizzes,validate, getFilledQuizzes, getQuizzesToFill, getQuiz, getQuizToFill} = require('../controllers/quizCtrl');
router.route('/quizFull')
       .get(isAuthenticated,getFilledQuizzes)

router.route('/quizToFill')
       .get(isAuthenticated,getQuizzesToFill);

router.route('/quizToFill/:id')
       .get(isAuthenticated,getQuizToFill)

router.route('/quiz')
       .get(isAuthenticated,isAdmin,getQuizzes)
       .post(isAuthenticated,isAdmin,validate('createQuizzes'),createQuizzes);

router.route('/quiz/:id')
      .get(isAuthenticated,isAdmin,getQuiz)

module.exports = router;