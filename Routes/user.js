const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router();
const JwtService = require("../Services/JwtService");

//For upload docs
const multer = require("multer");
//For upload docs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Images"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

const userController = require("../Controllers/user");

const { user } = require("../models");

router.post("/register", userController.adduser);

router.get("/auth", JwtService.verifyuser, userController.authenticateUser);

router.get("/logout", userController.logoutuser);

router.post("/login", userController.loginuser);

router.patch("/verifyemail", userController.verifyEmail);

router.get(
  "/getuserbasicdetails/:id",
  JwtService.verifyuser,
  JwtService.roleBasedAuth(["user", "admin", "secondAdmin"]),
  userController.getBasicDetails
);

router.patch(
  "/updatebasicdetails",
  JwtService.verifyuser,
  JwtService.roleBasedAuth(["user", "admin", "secondAdmin"]),
  userController.updateBasicDetails
);

router.post("/forgot-password", userController.forgotPassword);

router.get("/reset-password/:id/:token", userController.resetPassword);

router.post("/addnew-password/:id/:token", userController.addNewPassword);






router.patch("/updatePassword", userController.updatePassword);

//Upload files into database
router.post(
  "/fileUpload/:userId",
  upload.array("files"),
  userController.fileUpload
);

router.post("/contactUs", userController.contactUs);


module.exports = router;