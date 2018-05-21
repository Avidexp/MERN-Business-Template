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
    var error = "";
    User.findOne({ 'email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err){
            error = err;
            // res.send({"Error": err})
        }
           

        // check to see if theres already a user with that email
        if (user) {
            error = "Email already exists";
        //    res.send({"Error": "Email already exists"});
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
                charges:[{  id: 0,
                    object: "",
                    amount: 0,
                    amount_refunded: 0,
                    application: "",
                    application_fee: 0,
                    balance_transaction: "",
                    captured: false,
                    created: 0,
                    currency: "",
                    customer: "",
                    description: "",
                    destination: "",
                    dispute: "",
                    failure_code: "",
                    failure_message: "",
                    fraud_details: {},
                    invoice: "",
                    livemode: false,
                    metadata: {},
                    on_behalf_of: "",
                    order: "",
                    outcome:
                     { network_status: "",
                       reason: "",
                       risk_level:"",
                       seller_message: "",
                       type: "" },
                    paid: false,
                    receipt_email: "",
                    receipt_0: "",
                    refunded: false,
                    refunds:
                     { object: "",
                       data: [],
                       has_more: false,
                       total_count: 0,
                       url: "" },
                    review: "",
                    shipping: "",
                    source:
                     { id: "",
                       object: "",
                       address_city: "",
                       address_country: "",
                       address_line1: "",
                       address_line1_check: "",
                       address_line2: "",
                       address_state: "",
                       address_zip: "",
                       address_zip_check: "",
                       brand: "",
                       country: "",
                       customer: "",
                       cvc_check: "",
                       dynamic_last4: "",
                       exp_month: 0,
                       exp_year: 0,
                       fingerprint: "",
                       funding: "",
                       last4: "",
                       metadata: {},
                       name: "",
                       tokenization_method: "" },
                    source_transfer: "",
                    statement_descriptor: "",
                    status: "",
                    transfer_group: "" }],
                budjet:{
                    MonthlyIncome: "",
                    YearlyIncome: "",
                    Expenses: [{
                        amount: 0,
                        Description: ""
                        }]
                },
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
                    error =err;
                    // res.send({"Error": err});
                } else {
                    
                    // res.redirect('/login');
                }
            });
        }

    }); 
    //if user does exist return an error

    //if a user with email does not exist, create / save user 
    if(error){
    res.send({"Error": error});
    }else {
        res.redirect('/');

    }

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
