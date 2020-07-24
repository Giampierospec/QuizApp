const express = require('express');
const router = express.Router();
const {isAuthenticated, isAdmin}  = require('../controllers/authCtrl');
const {getQuizzes,createQuizzes} = require('../controllers/quizCtrl');
router.route('/quizFull')
       .get(isAuthenticated,getQuizzes)

router.route('/quiz')
       .post(isAuthenticated,isAdmin,createQuizzes)

module.exports = router;