const passport = require('passport');
const app = express();

module.exports = (app) =>{
    app.get('/auth/google/callback',passport.authenticate('google'));


    app.get('/auth/google', passport.authenticate('google',{
            scope: ['profile', 'email']
        })
    )
}
