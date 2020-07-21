const {createUser} = require('../controllers/authCtrl');
const express = require('express');
const router = express.Router();
router.route('/users')
      .post(createUser);


module.exports = router;