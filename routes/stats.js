const express = require('express');

const router = express.Router();
const {getQuizStats, getQuestions} = require('../controllers/statsCtrl');
const { isAuthenticated, isAdmin } = require('../controllers/authCtrl');

router.route('/stats')
    .get(isAuthenticated,isAdmin,getQuizStats);
router.route('/titleStats')
        .get(getQuestions);

module.exports = router;