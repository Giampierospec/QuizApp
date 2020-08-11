const express = require('express');

const router = express.Router();
const {getQuizStats} = require('../controllers/statsCtrl');
const { isAuthenticated, isAdmin } = require('../controllers/authCtrl');

router.route('/stats')
    .get(isAuthenticated,isAdmin,getQuizStats);

module.exports = router;