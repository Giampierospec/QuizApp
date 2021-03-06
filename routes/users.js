const { createUser,
      getCurrentUser,
      isAuthenticated,
      loginUser,
      logout,
      isAdmin,
      getUsers,
      changeRole,
      isSuperUser } = require('../controllers/authCtrl');
const express = require('express');
const router = express.Router();
router.route('/login')
      .post(loginUser);

router.route('/logout')
      .get(isAuthenticated, logout);
router.route('/users')
      .get(isAuthenticated, getCurrentUser)
      .post(createUser);

router.route('/manage')
      .get(isAuthenticated, isSuperUser, getUsers)
      .put(isAuthenticated, isSuperUser, changeRole);

module.exports = router;