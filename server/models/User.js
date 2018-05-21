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
    charges:[ {}],
    budjet:{
        MonthlyIncome: Number,
        YearlyIncome: Number,
        Expenses: [{
            amount: Number,
            Description: String
            }]
    },
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


/*
 id: String,
        object: String,
        amount: Number,
        amount_refunded: Number,
        application: String,
        application_fee: Number,
        balance_transaction: String,
        captured: Boolean,
        created: Number,
        currency: String,
        customer: String,
        description: String,
        destination: String,
        dispute: String,
        failure_code: String,
        failure_message: String,
        fraud_details: {},
        invoice: String,
        livemode: Boolean,
        metadata: {},
        on_behalf_of: String,
        order: String,
        outcome: {
           network_status: String,
           reason: String,
           risk_level:String,
           seller_message: String,
           type: String },
        paid: Boolean,
        receipt_email: String,
        receipt_number: String,
        refunded: Boolean,
        refunds:
         { object: String,
           data: [],
           has_more: Boolean,
           total_count: Number,
           url: String },
        review: String,
        shipping: String,
        source:
         { id: String,
           object: String,
           address_city: String,
           address_country: String,
           address_line1: String,
           address_line1_check: String,
           address_line2: String,
           address_state: String,
           address_zip: String,
           address_zip_check: String,
           brand: String,
           country: String,
           customer: String,
           cvc_check: String,
           dynamic_last4: String,
           exp_month: Number,
           exp_year: Number,
           fingerprint: String,
           funding: String,
           last4: String,
           metadata: {},
           name: String,
           tokenization_method: String },
        source_transfer: String,
        statement_descriptor: String,
        status: String,
        transfer_group: String 
*/