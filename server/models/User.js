const mongoose = require('mongoose')
const {Schema} = mongoose;
var bcrypt   = require('bcrypt-nodejs');
var userSchema = mongoose.Schema({
    googleId: String,
    credits: Number,
    firstName: String,
    lastName: String,
    email        : String,
    password     : String,
facebook         : {
    id           : String,
    token        : String,
    name         : String,
    email        : String
},
twitter          : {
    id           : String,
    token        : String,
    displayName  : String,
    username     : String
},
google           : {
    googleId           : String,
    firstName        : String,
    lastName        : String,
    email         : String,
    displayName         : String
}

});
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
// Store data in the users collection using the above schema
mongoose.model('users', userSchema);