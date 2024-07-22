const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();


const db = require("./models");

const app = express();
app.use(express.json());
app.use(cookieParser());



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
const testRoutes = require("./Routes/test");

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/test", testRoutes);
 
db.sequelize.sync({force:false}).then(() => { 
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}); 
 