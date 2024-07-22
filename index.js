const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
//to file upload
const multer = require("multer");
const path = require("path");

const db = require("./models");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads")); // Serve uploaded files statically

//middleware
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(bodyparser.json());

//Routers
const userRoutes = require("./Routes/user");
const adminRoutes = require("./Routes/admin");

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
 
db.sequelize.sync({force:false}).then(() => { 
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}); 
 