require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const app = express();
const {usersRoutes,quizzesRoutes} = require('./routes')

app.use(bodyParser.json());
app.use(expressValidator);
app.use(cookieSession({
    maxAge: 60000 * 24,
    keys: [keys.cookieSecret]
}));

app.use('/api',usersRoutes,quizzesRoutes);
const PORT = 5000 || process.env.PORT;

if(process.env.NODE_ENV === 'production'){
    // Express will serve Production Assets
    app.use(express.static('client/build'));

    //Express will serve up the index.html
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}
app.listen(PORT,()=> console.log(`App started on port ${PORT}`));