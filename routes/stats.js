const express = require('express');

const router = express.Router();
const {getQuizStats, getQuestions, getTitles} = require('../controllers/statsCtrl');
const { isAuthenticated, isAdmin } = require('../controllers/authCtrl');

router.route('/stats')
    .get(isAuthenticated,isAdmin,getQuizStats);
router.route('/titleStats')
        .get(isAuthenticated,isAdmin,getQuestions);
router.route('/titles')
        .get(isAuthenticated,isAdmin,getTitles);

module.exports = router;