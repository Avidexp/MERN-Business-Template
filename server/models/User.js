const mongoose = require('mongoose')
const {Schema} = mongoose;


const userSchema = new Schema({
    googleId: String,
    firstName: String,
    lastName: String,
    displayName: String
});

// Store data in the users collection using the above schema
mongoose.model('users', userSchema);