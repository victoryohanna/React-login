const mongoose = require('mongoose');

const User = mongoose.Schema({
    firstName : {
        type : String
    },
    lastName:{
        type : String
    },
    email: {
        type : String,
        require: true
    },
    password : {
        type : String
    },
    dateCreated : {
        type: Date
    }
   
})

module.exports = mongoose.model('user', User)