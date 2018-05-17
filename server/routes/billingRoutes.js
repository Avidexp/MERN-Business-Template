const keys = require('../config/keys');
const stripe = require("stripe")(keys.StripeSecret);
const requireLogin = require('../middlewares/requireLogin');

module.exports = async (app) =>{
    //requireLogin is middleware that checks if user is logged in prior than executing request
    app.post('/api/stripe', requireLogin, async (req,res) => {
        if(!req.user){
            return res.status(401).send({error: 'You must log in!'}); // unauthorized
        }else {
            const charge = await stripe.charges.create({
                amount: req.body.amount,
                currency: "usd",
                source: req.body.token.id, // obtained with Stripe.js
                description: `Charge for ${req.body.token.email}`
              });
              //to add credits after successfull payment
              //req.user is defaulted with passport
              req.user.credits += req.body.credits;
              const user = await req.user.save();
              res.send(user);
        }
        });

    // app.post('/api/stripe', (req,res) => {
    //     stripe.charges.create({
    //         amount: req.body.amount,
    //         currency: "usd",
    //         source: req.body.token.id, // obtained with Stripe.js
    //         description: `Charge for ${req.body.token.email} `
    //       }, function(err, charge){
    //           //asyncronously called
    //       });
    //     });




}
