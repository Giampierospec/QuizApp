const express = require('express');

const router = express.Router();
const { getQuizStats, getQuestions, getTitles, groupedRoles } = require('../controllers/statsCtrl');
const { isAuthenticated, isAdmin } = require('../controllers/authCtrl');

router.route('/stats')
        .get(isAuthenticated, isAdmin, getQuizStats);
router.route('/titleStats')
        .get(isAuthenticated, isAdmin, getQuestions);
router.route('/titles')
        .get(isAuthenticated, isAdmin, getTitles);
router.route('/roles')
        .get(isAuthenticated, isAdmin, groupedRoles);

module.exports = router;