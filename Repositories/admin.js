const bcrypt = require("bcrypt");
const { admin } = require("../models");
const jwt = require("jsonwebtoken");



module.exports.addadmin = async (obj) => {
  try {
    const existingUser1 = await admin.findOne({
      where: { userName: obj.userName },
    });
    const existingUser2 = await SecondAdmin.findOne({
      where: { userName: obj.userName },
    });

    if (existingUser1 || existingUser2) {
      return { status: false, message: "already registered user" };
    }
    const hashedPw = await bcrypt.hash(obj.password.toString(), 10);
    var data = obj;
    data.password = hashedPw;
    data.password = obj.password;
    const res = await admin.create(data);

    return { status: true, id: res.dataValues.id };
  } catch (error) {
    return { status: false };
  }
};

module.exports.addFirstAdmin = async (obj) => {
  try {
    const count = await admin.count();
    if (count == 0) {
      const hashedPw = await bcrypt.hash(obj.password.toString(), 10);
      var data = obj;
      data.password = hashedPw;
      data.password = obj.password;
      const res = await admin.create(data);

      return { status: true, id: res.dataValues.id };
    } else {
      return { status: false, message: "user exist" };
    }
  } catch (error) {
    return { status: false };
  }
};

module.exports.loginadmin = async (obj) => {
  try {
    const admin = await admin.findOne({
      where: {
        userName: obj.userName,
      },
    });

    if (admin) {
      const isMatch = await bcrypt.compare(
        obj.password.toString(),
        admin.password
      );

      if (!isMatch) {
        return { status: false, message: "Invalid credentials" };
      } else {
        return {
          status: true,
          name: admin.dataValues.name,
          id: admin.dataValues.id,
          type: "admin",
        };
      }
    }

    const secondAdmin = await SecondAdmin.findOne({
      where: {
        userName: obj.userName,
      },
    });

    if (secondAdmin) {
      const isMatch = await bcrypt.compare(
        obj.password.toString(),
        secondAdmin.password
      );

      if (!isMatch) {
        return { status: false, message: "Invalid credentials" };
      } else {
        return {
          status: true,
          name: secondAdmin.dataValues.name,
          id: secondAdmin.dataValues.id,
          type: "secondAdmin",
        };
      }
    }

    return { status: false, message: "Admin not found" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getmessages = async () => {
  try {
    const messages = await contacts.findAll();
    console.log(messages);
    return messages;
  } catch (error) {
    throw new Error(`Error while fetching messages: ${error.message}`);
  }
};