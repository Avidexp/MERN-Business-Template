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

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
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
