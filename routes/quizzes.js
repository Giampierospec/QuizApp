const express = require('express');
const router = express.Router();
const {isAuthenticated}  = require('../controllers/authCtrl');
const {getQuizzes} = require('../controllers/quizCtrl');
router.route('/quiz')
       .get(isAuthenticated,getQuizzes)

module.exports = router;