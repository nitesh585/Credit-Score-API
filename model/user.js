const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs")

// User Schema to store data in mongoDb
const User = new mongoose.Schema({
    name: { 
        type: String, 
        required:true},

    username:{ 
        type: String, 
        required:true},

    password: { 
        type: String,
        required:true },

    accountNo: { type: String}
});

// hash the password
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
  
// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', User);