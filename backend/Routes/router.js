const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const upload = require('../middleware/multerConfig');

router.post('/login',controller.login);

router.post ('/signIn',controller.signIn);

router.post('/createEmployee', upload.single('img'), controller.createEmployee);

router.get('/employee',controller.employee)

router.post('/updateEmployee', upload.single('img'), controller.updateEmployee);

router.delete('/employee/:email', controller.deleteEmployee);

module.exports = router;