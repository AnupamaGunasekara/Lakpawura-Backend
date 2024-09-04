const bcrypt = require("bcrypt");
const {
  user,
  contacts,
  post,
  images
} = require("../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");
const sendVerificationMail = require("../utils/sendVerificationMail");
const { where } = require("sequelize");
const { sequelize, DataTypes } = require("../models/index");
const e = require("express");


//register user
module.exports.adduser = async (obj) => {
  try {
    const existingEmail = await user.findOne({
      where: { email: obj.email },
    });
    if (existingEmail) {
      return { status: false, message: "already registered email" };
    }
    //hashing password
    const hashedPw = await bcrypt.hash(obj.password.toString(), 10);
    var data = obj;
    data.password = hashedPw;
    data.password = obj.password;
    data.emailToken = crypto.randomBytes(64).toString("hex");
    const res = await user.create(data);



    console.log("logged in");
    sendMail(data.name, data.email, data.emailToken);
    return { status: true, id: res.dataValues.id };
  } catch (error) {
    return { status: false };
  }
};

module.exports.loginuser = async (obj) => {
  try {
    const systemuser = await user.findOne({
      where: {
        email: obj.email,
      },
    });

    if (!systemuser) {
      return { status: false, message: "user not found" };
    }

    const isMatch = await bcrypt.compare(
      obj.password.toString(),
      systemuser.password
    );

    if (!isMatch) {
      return { status: false, message: "Invalid credentials" };
    } else {
      return {
        status: true,
        name: systemuser.dataValues.name,
        id: systemuser.dataValues.id,
      };
    }
  } catch (error) {
    console.error("Error in login:", error);
    return { status: false, message: error.message };
  }
};

//update user details
module.exports.updateBasicDetails = async (obj) => {
  try {
    console.log(".................")
    //checking is there any user with given id and email
    const existingEmail = await user.findOne({
      where: { id: obj.id, email: obj.email },
    });
    const { password, ...dataWithoutPassword } = obj;
    if (existingEmail) {
      console.log("yes");
      await user.update(dataWithoutPassword, { where: { id: obj.id } });
      console.log("done");
    } else {
      //checking user enterd email is previously entered or not
      const existingEmail = await user.findOne({
        where: { email: obj.email },
      });
      if (existingEmail) {
        return { status: false, message: "already registered email" };
      }

      dataWithoutPassword.emailToken = crypto.randomBytes(64).toString("hex");
      dataWithoutPassword.isVerifiedEmail = false;
      await user.update(dataWithoutPassword, { where: { id: obj.id } });
      sendMail(
        dataWithoutPassword.name,
        dataWithoutPassword.email,
        dataWithoutPassword.emailToken
      );
      console.log(dataWithoutPassword.name);
      console.log(dataWithoutPassword.email);
      console.log("no");
    }

    return { status: true };
  } catch (error) {
    return { status: false };
  }
};

// get user details
module.exports.getBasicDetails = async (id) => {
 
  try {
    const userdata = await user.findOne({ where: { id: id } });
  
    const {
      password,
      emailToken,
      createdAt,
      updatedAt,
      ...userWithoutSensitiveInfo
    } = userdata.dataValues;
    console.log(userWithoutSensitiveInfo);

    return { status: true, data: userWithoutSensitiveInfo };
  } catch (error) {
    console.log(error.message)
    return { status: false };
  }
};

module.exports.forgotPassword = async (email) => {
  try {
    const existingEmail = await user.findOne({ where: { email: email } });

    if (!existingEmail) {
      console.log("no email");
      return { status: false, message: "Email not found" };
    }
    const secret = process.env.JWT_SECRET + existingEmail.password;
    const token = jwt.sign(
      { id: existingEmail.id, email: existingEmail.email },
      secret,
      { expiresIn: "15m" }
    );
    const link = `http://localhost:3000/api/user/reset-password/${existingEmail.id}/${token}`;
    console.log(link);
    // sendMail here
    sendVerificationMail(existingEmail.id, existingEmail.email, token);

    return { status: true };
  } catch (error) {
    return { status: false };
  }
};

module.exports.resetPassword = async (id, token) => {
  try {
    const olduser = await user.findOne({ where: { id: id } });

    if (!olduser) {
      return { status: false, message: "user Not Exist" };
    }
    const secret = process.env.JWT_SECRET + olduser.dataValues.password;
    const decoded = jwt.verify(token, secret);
    console.log(decoded);

    return { status: true };
  } catch (error) {
    console.log("not verified");
    return { status: false };
  }
};

module.exports.addNewPassword = async (id, token, newPassword) => {
  try {
    const olduser = await user.findOne({ where: { id: id } });
    if (!olduser) {
      return { status: false, message: "user Not Exist" };
    }
    const secret = process.env.JWT_SECRET + olduser.dataValues.password;
    const decoded = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(newPassword.toString(), 8);
    await user.update(
      { password: encryptedPassword },
      { where: { id: id } }
    );

    console.log(decoded);

    return { status: true };
  } catch (error) {
    console.log("not verified");
    return { status: false };
  }
};





module.exports.verifyEmail = async (emailToken) => {
  try {
    let user = await user.findOne({ where: { emailToken: emailToken } });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", error: "user not found" });
    }

    await user.update(
      { isVerifiedEmail: true, emailToken: null },
      { where: { emailToken: emailToken } }
    );
    return { status: "Success", message: "user verified successfully" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};





module.exports.updatePassword = async (token, data) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const user = await user.findOne({
      where: {
        id: id,
      },
    });
    console.log(data);
    const isMatch = await bcrypt.compare(
      data.OldPassword.toString(),
      user.password
    );

    if (!isMatch) {
      return { status: false, message: "user not found" };
    }
    const hashedPassword = await bcrypt.hash(data.Password.toString(), 10);

    await user.update(
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


module.exports.contactUs = async (firstName,lastName,email,phone,message) => {
  try{
    console.log(email);
    // Check if the email already exists in the database
    // const existingContact = await contacts.findOne({ where: { email: email } });
    // if (existingContact) {
    //   return { success: false, message: 'Email already exists. Please use a different email address.' };
    // }

    // If the email does not exist, create a new contact
    const contact = await contacts.create({ firstName : firstName, lastName : lastName, email : email, phone : phone, message : message });

    return { success: true, message: 'Contact information successfully saved.',contact};
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    throw new Error('Database operation failed'); // Update error handling for consistency
  }
};


module.exports.getPosts = async () => {
  try {
    const posts = await post.findAll({
      include: [
        {
          model: images,
          attributes: ['path'] // Only include the path attribute from the images model
        }
      ]
    });
    console.log(posts)
    return { status: true, data: posts };
  } catch (error) {
    console.error(error);
    return { status: false };
  }
};


module.exports.updatebasicdetailswithpassword = async (token, data) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    console.log(id)
    const foundeduser = await user.findOne({
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

    await user.update(
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
