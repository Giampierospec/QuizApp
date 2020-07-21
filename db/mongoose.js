const keys = require('../config/keys');
const mongoose = require('mongoose');
mongoose.connect(keys.mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;
