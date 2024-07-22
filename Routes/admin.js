const express = require('express')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router()
const JwtService = require("../Services/JwtService")

const adminController =require('../Controllers/admin')


router.post('/register',JwtService.roleBasedAuth(["admin"]),adminController.addadmin);

router.post('/createfirstadmin',adminController.addFirstAdmin);

router.post('/login',adminController.loginadmin);

router.get('/getmessages',adminController.getmessages);







 

module.exports = router;