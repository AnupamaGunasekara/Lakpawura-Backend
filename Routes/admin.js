const express = require('express')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router()
const JwtService = require("../Services/JwtService")

const adminController =require('../Controllers/admin')


router.post('/register',adminController.addadmin);

router.post('/createfirstadmin',adminController.addFirstAdmin);

router.post('/login',adminController.loginadmin);

router.get('/getmessages',adminController.getmessages);

router.get('/getdetails/:id',adminController.getBasicDetails);

router.delete('/removepost/:id',adminController.removepost);

router.post('/sendreply', adminController.sendreply);

router.post('/update/:adminId', adminController.updateAdminDetails);

router.patch("/updatebasicdetailswithpassword", adminController.updatebasicdetailswithpassword);







 

module.exports = router;