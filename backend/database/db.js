const mongoose = require('mongoose');

exports.connectDatabase = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/employee')
    .then(()=>{
        console.log('The Database is connected successfully');
    })
}
