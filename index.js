const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const path = require('path');
const db = require("./models");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Apply CORS before other routes
app.use(cors({
  origin: true, // Accepts all origins, but adjust as necessary for security
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true, // Important if your API uses cookies or sessions
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'] 
}));

app.use(bodyparser.json());

// Routers
const userRoutes = require("./Routes/user");
const adminRoutes = require("./Routes/admin");
const testRoutes = require("./Routes/test");

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/test", testRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hi world');
});


db.sequelize.sync({force:false}).then(() => { 
  console.log("Database synced");
}); 
