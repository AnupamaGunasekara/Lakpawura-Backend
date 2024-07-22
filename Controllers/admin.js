const adminService = require("../Services/admin");
const { admin } = require("../models");

module.exports.addadmin = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "empty request" });
    }
    if (
      req.body.userName == undefined ||
      req.body.userName == "" ||
      req.body.password == undefined ||
      req.body.password == "" ||
      req.body.name == undefined ||
      req.body.name == ""
    ) {
      return res.status(400).json({ status: false, message: "empty fields" });
    }
    console.log("came here")
    const result = await adminService.addadmin(req.body);

    if (result.status) {
      return res.json({ Status: "Success" });
    } else if (result.message == "already registered user") {
      return res.json({ status: false, message: "already registered user" });
    } else {
      return res.json({ Status: "Failed" });
    }
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

module.exports.addFirstAdmin = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "empty request" });
    }
    if (
      req.body.userName == undefined ||
      req.body.userName == "" ||
      req.body.password == undefined ||
      req.body.password == "" ||
      req.body.name == undefined ||
      req.body.name == ""
    ) {
      return res.status(400).json({ status: false, message: "empty fields" });
    }

    const result = await adminService.addFirstAdmin(req.body);

    if (result.status) {
      res.cookie("token", result.token);
      return res.json({ Status: "Success" });
    } else if (result.message == "user exist") {
      return res.json({ Status: "Failed", message: "user exist" });
    } else {
      return res.json({ Status: "Failed" });
    }
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

module.exports.loginadmin = async (req, res) => {
  if (
    req.body.userName == undefined ||
    req.body.userName == "" ||
    req.body.password == undefined ||
    req.body.password == ""
  ) {
    return res.status(400).json({ status: false, message: "empty fields" });
  }
  const result = await adminService.loginadmin(req.body);
  if (!result.status) {
    res.json({ Status: "Failed" });
  } else {
    if (result.type === "admin") {
      res.cookie("token", result.token);
      res.json({ Status: "Success", Type: "admin" });
    } else {
      res.cookie("token", result.token);
      res.json({ Status: "Success", Type: "secondAdmin" });
    }
  }
};

module.exports.getmessages = async (req, res) => {
  try {
    const messages = await adminService.getmessages();
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};







