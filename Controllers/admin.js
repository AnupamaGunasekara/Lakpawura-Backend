const adminService = require("../Services/admin");
const { admin } = require("../models");

module.exports.addadmin = async (req, res) => {
  try {
    console.log("------------------------")
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "empty request" });
    }
    if (
      req.body.email == undefined ||
      req.body.email == "" ||
      req.body.password == undefined ||
      req.body.password == "" ||
      req.body.name == undefined ||
      req.body.name == ""   ||
      req.body.adminid == undefined ||
      req.body.adminid == ""
    ) {
      return res.status(400).json({ status: false, message: "empty fields" });
    }

    const result = await adminService.addadmin(req.body);

    if (result.status) {
      return res.json({ Status: "Success" });
    } else if (result.message == "already registered admin") {
      return res.json({ Status: "Failed", message: "user exist" });
    } else {
      return res.json({ Status: "Failed" });
    }
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

module.exports.addFirstAdmin = async (req, res) => {
  try {
    console.log("------------------------")
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "empty request" });
    }
    if (
      req.body.email == undefined ||
      req.body.email == "" ||
      req.body.password == undefined ||
      req.body.password == "" ||
      req.body.name == undefined ||
      req.body.name == ""   ||
      req.body.adminid == undefined ||
      req.body.adminid == ""
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
      res.json({ Status: "Success", Type: "admin", token: result.token });
    } else {
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


module.exports.getmessages = async (req, res) => {
  try {
    const messages = await adminService.getmessages();
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.removepost = async (req, res) => {
  try {
    await adminService.removepost(req.params.id);
    return res.json({ message: "post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.sendreply = async (req, res) => {
  try {
    const email = req.body.email;
    const reply= req.body.reply;
    console.log(email);
    console.log(reply)
    await adminService.sendreply(email,reply);
    return res.json({ message: "email sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getBasicDetails = async (req, res) => {
  try {
    const result = await adminService.getBasicDetails(req.params.id);

    if (result.status) {
      return res.json({ Status: "Success", Data: result.data });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports.updateAdminDetails= async (req, res) => {
    const adminId = req.params.adminId;
    const adminData = req.body;
    console.log(adminData);
    console.log(adminId);
    const result = await adminService.updateAdminDetails(adminId, adminData);
    if (result.status) {
      return res.status(200).json({ Status: "Success", message: "Admin updated successfully" });
    }

    return res.status(400).json({ Status: "Failure", message: result.message });
  };


  module.exports.updatebasicdetailswithpassword = async (req, res) => {
    try {
      const result = await adminService.updatebasicdetailswithpassword(
        req.cookies.token,
        req.body
      );
      return res.status(200).json(result);
    } catch (error) {
      return { status: false };
    }
  };


