const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const app = express();
const bodyParser = require('body-parser');

require('./models/User');
require('./services/passport');



mongoose.connect(keys.MongoURL);

// app.use is used to 'use' middleware
app.use(bodyParser.json()); //parses requests
app.use(
    cookieSession({
        // 30 days in milliseconds
        maxAge:30 * 24 * 60 * 60 * 1000,
        // takes an array of keys and picks one at random for additional security
        keys: [keys.cookieKey]
    })
);

// tells passport to use cookies and initialize session :)
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    // Express will server production assets eg. main.js, main.css ect.
    app.use(express.static('client/build')); 
    
    // Express will serve index.html file if it doesn't recognize the route.
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));;
    })

}
const PORT = process.env.PORT || 5000;
app.listen(PORT);










