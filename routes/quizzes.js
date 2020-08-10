const express = require('express');
const router = express.Router();
const {isAuthenticated, isAdmin}  = require('../controllers/authCtrl');
const {getQuizzes,
       createQuizzes,
       validate, 
       getFilledQuizzes, 
       getQuizzesToFill, 
       getQuiz, 
       getQuizToFill, 
       fillQuiz,
       getFilledQuiz,
       updateQuiz,
       deleteFilledQuiz} = require('../controllers/quizCtrl');

router.route('/quizFull')
       .get(isAuthenticated,getFilledQuizzes)

router.route('/quizFull/:id')
       .get(isAuthenticated,getFilledQuiz)
       .delete(isAuthenticated,deleteFilledQuiz);

router.route('/quizToFill')
       .get(isAuthenticated,getQuizzesToFill)
       .post(isAuthenticated,fillQuiz)

router.route('/quizToFill/:id')
       .get(isAuthenticated,getQuizToFill)

router.route('/quiz')
       .get(isAuthenticated,isAdmin,getQuizzes)
       .post(isAuthenticated,isAdmin,validate('createQuizzes'),createQuizzes);

router.route('/quiz/:id')
      .get(isAuthenticated,isAdmin,getQuiz)
       .put(isAuthenticated, isAdmin, validate('createQuizzes'), updateQuiz)

module.exports = router;