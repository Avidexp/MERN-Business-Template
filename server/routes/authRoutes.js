// const passport = require('passport');

// module.exports = (app) =>{
//     app.get('/auth/google', passport.authenticate('google',{
//         scope: ['profile', 'email']
//     })
// );

//     app.get('/auth/google/callback', (req,res)=>{
//         passport.authenticate('google');
//         res.redirect('/dashboard');
//         }   
//     );




//     app.get('/api/logout', (req, res) => {
//         // attached to request object by passport, takes cookie, and kills id thats in there effectively logging out. 
//         req.logout();
//         // sends nothing because req.user has been removed by passport
//         res.redirect('/');
//         //res.send(req.user);
//     });

//     app.get('/api/current_user', (req, res) => {
//         res.send(req.user);
//     });


// }
const passport = require('passport');
const mongoose = require('mongoose')
const User = mongoose.model('users');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );


  app.post('/loginUser', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard');
   
  });

// app.post('/loginUser', (req,res,next) => {
//     console.log(req.body);
//     const email = req.body.username;
//     const password = req.body.password;

//     console.log(email);
//     console.log(password);
//     User.findOne({ email :  email }, function(err, user) {
//         // if there are any errors, return the error before anything else
//         if (err){
//             res.send({"Error": err})
//         }

//         // if no user is found, return the message
//         if (!user)
//         res.send({"Error": "Invalid Email"});
//         // if the user is found but the password is wrong
//         if (!user.validPassword(password)){
//             res.send({"Error": "Invalid password"});
//         } else {
//         // all is well, return successful user
//             res.send({"Success": true});
//     }
//     });
// });
  
// app.post('/signupUser', passport.authenticate('local-signup', {
//     successRedirect : '/dashboard', // redirect to the secure profile section
//     failureRedirect : '/signup', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
// }));

app.post('/signupUser', function(req,res,next){
    //see if user exists
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    var firstname = req.body.firstName;
    var lastName = req.body.lastName;
    User.findOne({ email :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
            res.send({"Error": err})

        // check to see if theres already a user with that email
        if (user) {
           res.send({"Error": "Email already exists"})
        } else {

            // if there is no user with that email
            // create the user

            var newUser = new User({
                googleId: "",
                lastName: lastName,
                firstName: firstname,
                credits: 0,
                email        : email,
                password     : "",
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
                    googleId: "",
                    firstName: "",
                    lastName: "",
                    displayName: "",
                    email: "",
                }
            });
            newUser.password = newUser.generateHash(password);
            newUser.email = email;
            // save the user
            newUser.save(function(err) {
                if (err){
                    res.send({"Error": err});
                } else {
                    passport.authenticate('local',{username: email,password: password});
                    res.redirect('/dashboard');
                    // res.send({"Success": true});
                    
                
                }
            });
        }

    }); 
    //if user does exist return an error

    //if a user with email does not exist, create / save user 

    //respond to request
});

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
