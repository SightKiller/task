const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    name:{
        typeof:String,
    },
    email:{
        typeof:String,
    },
    password:{
        typeof:String
    }
});

const Login = mongoose.model('Login',LoginSchema);

module.exports = Login;