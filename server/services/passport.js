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
