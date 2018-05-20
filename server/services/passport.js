const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose')
const User = mongoose.model('users');

//To generate cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// done is called after we get user from id
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) =>{
            done(null, user);
        })
});

// passport.use('local-login', new LocalStrategy(
// function(username, password, done) { // callback with email and password from our form
// console.log(username);
// console.log(password);
//     // find a user whose email is the same as the forms email
//     // we are checking to see if the user trying to login already exists
//         process.nextTick(function() {
//     User.findOne({ email :  username }, function(err, user) {
//         // if there are any errors, return the error before anything else
//         if (err)
//             return done(err);

//         // if no user is found, return the message
//         if (!user)
//             return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

//         // if the user is found but the password is wrong
//         if (!user.validPassword(password))
//             return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

//         // all is well, return successful user
//         return done(null, user);
//     });}

// )}));


// passport.use('local-signup', new LocalStrategy({
//     // by default, local strategy uses username and password, we will override with email
//     usernameField : 'email',
//     passwordField : 'password',
//     passReqToCallback : true // allows us to pass back the entire request to the callback
// },
// function(req, email, password, done) {

//     // asynchronous
//     // User.findOne wont fire unless data is sent back
//     process.nextTick(function() {
//         console.log(email);
//         console.log(password);
//     // find a user whose email is the same as the forms email
//     // we are checking to see if the user trying to login already exists
//     User.findOne({ email :  email }, function(err, user) {
//         // if there are any errors, return the error
//         if (err)
//             return done(err);

//         // check to see if theres already a user with that email
//         if (user) {
//             return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//         } else {

//             // if there is no user with that email
//             // create the user
//             var newUser            = new User();

//             // set the user's local credentials
//             newUser.email    = email;
//             newUser.local.password = newUser.generateHash(password);

//             // save the user
//             newUser.save(function(err) {
//                 if (err)
//                     throw err;
//                 return done(null, newUser);
//             });
//         }

//     });    

//     });

// }));
passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.validPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) =>{
       const existingUser = await User.findOne({googleId: profile.id});

        if(existingUser){
            // already have record of user with given profile id

            // tells passport we're finished and found user
            done(null, existingUser);
        } else {
            // No record with user id make new record 

            const user = await new User({
                googleId: profile.id,
                lastName: profile.name.familyName,
                firstName: profile.name.givenName,
                email        : "",
                password     : "",
                credits: 0,
                facebook: {
                    id           : "",
                    token        : "",
                    name         : "",
                    email        : ""
                },
                twitter: {
                    id           : "",
                    token        : "",
                    displayName  : "",
                    username     : ""
                },
                google : {
                    googleId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                }
            }).save()
            done(null, user);
        }


    console.log('Profile:', profile);
    }
));
