const mongoose = require('mongoose');
const logInModel = require('../models/login');
const employeeModel = require('../models/employeeList');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const moment = require('moment');


exports.signIn = async (req,res) =>{
    const {name, email, password} = req.body;
    const newUser = new logInModel({
        Name:name,
        email:email,
        password:password
    })
    newUser.save().then(()=>{
        res.send({"response":true})
    })
}
exports.login = async (req,res)=>{
    let {email,password} = req.body
    let user = await logInModel.findOne({email:email,password:password})
    if(user !== null){
        res.send({"response":true})
    }else{
        res.send({"response":false})
    }
}
exports.createEmployee = async (req, res) => {
    const { name, email, mob_no, designation, gender, courses } = req.body;
    const img = req.file;  

    if (!img) {
        return res.status(400).send('Image file is required.');
    }

    try {
        const existingEmployee = await employeeModel.findOne({ email });
        if (existingEmployee) {
            return res.status(409).send('Email already exists'); 
        }

       
        const fileName = `${name.replace(/\s/g, '_')}_profile.${img.originalname.split('.').pop()}`;

        const formattedDate = moment().format('DD-MMM-YYYY');  

        let newEmployee = new employeeModel({
            img: {
                data: img.buffer,
                contentType: img.mimetype,
                fileName: fileName  
            },
            name,
            email,
            mob_no,
            designation,
            gender,
            courses: Array.isArray(courses) ? courses : courses.split(','), 
            created_date: formattedDate  
        });

        await newEmployee.save();
        res.send('Employee added successfully');
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).send('Error adding employee');
    }
};




exports.employee = async (req, res) => {
    try {
        let employees = await employeeModel.find({});

        const formattedEmployees = employees.map(employee => {
            return {
                ...employee._doc,
                created_date: moment(employee.created_date).format('DD-MMM-YYYY') 
            };
        });

        res.send(formattedEmployees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).send("Error fetching employees");
    }
};


exports.updateEmployee = async (req, res) => {
    const { name, email, mob_no, designation, gender, course, created_date } = req.body;
    const img = req.file;
    const updateData = {};
    if (name) updateData.name = name;
    if (mob_no) updateData.mob_no = mob_no;
    if (designation) updateData.designation = designation;
    if (gender) updateData.gender = gender;
    if (course) updateData.course = course;
    if (created_date) updateData.created_date = created_date;
    if (img) {
        updateData.img = {
            data: img.buffer,
            contentType: img.mimetype
        };
    }
    if (!email) {
        return res.status(400).send({ message: "Email is required for updating employee." });
    }

    employeeModel.findOneAndUpdate({ email: email }, updateData, { new: true })
        .then(updatedEmployee => {
            if (!updatedEmployee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            console.log('Employee updated successfully');
            res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
        })
        .catch(err => {
            console.error('Error updating employee:', err);
            res.status(500).json({ message: 'Error updating employee' });
        });
};

exports.deleteEmployee = async (req, res) => {
    const { email } = req.params;

    employeeModel.findOneAndDelete({ email: email })
        .then(deletedEmployee => {
            if (!deletedEmployee) {
                return res.status(404).send({ message: "Employee not found" });
            }
            res.send({ message: "Employee deleted successfully" });
        })
        .catch(err => {
            console.error('Error deleting employee:', err);
            res.status(500).send({ message: "Error deleting employee" });
        });
};
