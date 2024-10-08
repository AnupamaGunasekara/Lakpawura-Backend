const bcrypt = require("bcrypt");
const { admin,contacts,post } = require("../models");
const jwt = require("jsonwebtoken");

module.exports.addadmin = async (obj) => {
  try {
    const existingadmin = await admin.findOne({
      where: { email: obj.email },
    });
    console.log(existingadmin);
    if (existingadmin) {
      return { status: false, message: "already registered admin" };
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
    const systemadmin = await admin.findOne({
      where: {
        email: obj.userName,
      },
    });

    if (systemadmin) {
      const isMatch = await bcrypt.compare(
        obj.password.toString(),
        systemadmin.password
      );

      if (!isMatch) {
        return { status: false, message: "Invalid credentials" };
      } else {
        return {
          status: true,
          name: systemadmin.dataValues.name,
          id: systemadmin.dataValues.id,
          type: "admin",
        };
      }
    }

    return { status: false, message: "Admin not found" };
  } catch (error) {
    console.log(error.message);
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

module.exports.removepost = async (id) => {
  try {
    //check wether taxpayerid exsits
    const existpost = await post.findOne({ where: { id: id } });
    if (existpost) {
      await post.destroy({ where: { id: id } });
    } else {
      return { message: "post do not found" };
    }
  } catch (error) {
    throw new Error(`Error while deleting taxpayer: ${error.message}`);
  }
};


module.exports.getBasicDetails = async (id) => {
  try {
    const user = await admin.findOne({ where: { id: id } });
    const {
      password,
      createdAt,
      updatedAt,
      ...userWithoutSensitiveInfo
    } = user.dataValues;

    return { status: true, data: userWithoutSensitiveInfo };
  } catch (error) {
    return { status: false };
  }
};


module.exports.findAdminById = async (adminId) => {
    try{
      return await admin.findOne({ where: { id: adminId } });
    }catch (error) {
      return { status: false };
    }
  };

  module.exports.findAdminByEmail = async (adminId) => {
    try{
      return await admin.findOne({ where: { email: email } });
    }catch (error) {
      return { status: false };
    }
  };

  module.exports.updateAdmin = async (adminId, updateData) => {
    try{
      return await admin.update(updateData, { where: { id: adminId } });
    }catch (error) {
      return { status: false };
    }
  };


  module.exports.updatebasicdetailswithpassword = async (token, data) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.id;
      console.log(id)
      const foundeduser = await admin.findOne({
        where: {
          id: id,
        },
      });
      console.log(foundeduser.dataValues.password);
      console.log(data.password);
      // const isMatch = await bcrypt.compare(
      //   data.OldPassword.toString(),
      //   user.password
      // );
  
      // if (!isMatch) {
      //   return { status: false, message: "user not found" };
      // }
      const hashedPassword = await bcrypt.hash(data.password.toString(), 10);
  
      await admin.update(
        { password: hashedPassword },
        {
          where: {
            id: id,
          },
        }
      );
  
      return { status: true };
    } catch (error) {
      return { status: false, message: "Failed" };
    }
  };
  
