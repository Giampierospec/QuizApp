let keys = {};
if(process.env.NODE_ENV !== 'production')
    keys = require('./dev');
if(process.env.NODE_ENV === 'production')
    kyes = require('./prod');

    
module.exports = keys;
