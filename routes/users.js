const {createUser, getCurrentUser, isAuthenticated, loginUser, logout} = require('../controllers/authCtrl');
const express = require('express');
const router = express.Router();
router.route('/login')
      .post(loginUser);

router.route('/logout')
      .get(isAuthenticated,logout);
router.route('/users')
      .get(isAuthenticated,getCurrentUser)
      .post(createUser);


module.exports = router;