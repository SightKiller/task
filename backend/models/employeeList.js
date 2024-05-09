const mongoose = require('mongoose');

const employeeListSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    },
    email: {
        type: String,
    },
    mob_no: {
        type: Number
    },
    designation: {
        type: String
    },
    gender: {
        type: String
    },
    courses: [{
        type: String
    }],
    created_date: {
        type: Date
    }
});

const employeeList = mongoose.model('employeeList', employeeListSchema);

module.exports = employeeList;
