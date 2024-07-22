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


//register User
module.exports.addUser = async (obj) => {
  try {
    const existingEmail = await User.findOne({
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
    const res = await User.create(data);



    console.log("logged in");
    sendMail(data.name, data.email, data.emailToken);
    return { status: true, id: res.dataValues.id };
  } catch (error) {
    return { status: false };
  }
};

module.exports.loginUser = async (obj) => {
  try {
    const User = await User.findOne({
      where: {
        email: obj.email,
      },
    });

    if (!User) {
      return { status: false, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(
      obj.password.toString(),
      User.password
    );

    if (!isMatch) {
      return { status: false, message: "Invalid credentials" };
    } else {
      return {
        status: true,
        name: User.dataValues.name,
        id: User.dataValues.id,
      };
    }
  } catch (error) {
    console.error("Error in login:", error);
    return { status: false, message: error.message };
  }
};

//update User details
module.exports.updateBasicDetails = async (obj) => {
  try {
    //checking is there any User with given id and email
    const existingEmail = await User.findOne({
      where: { id: obj.id, email: obj.email },
    });
    const { password, ...dataWithoutPassword } = obj;
    if (existingEmail) {
      console.log("yes");
      await User.update(dataWithoutPassword, { where: { id: obj.id } });
      console.log("done");
    } else {
      //checking user enterd email is previously entered or not
      const existingEmail = await User.findOne({
        where: { email: obj.email },
      });
      if (existingEmail) {
        return { status: false, message: "already registered email" };
      }

      dataWithoutPassword.emailToken = crypto.randomBytes(64).toString("hex");
      dataWithoutPassword.isVerifiedEmail = false;
      await User.update(dataWithoutPassword, { where: { id: obj.id } });
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

// get User details
module.exports.getBasicDetails = async (id) => {
  try {
    const user = await User.findOne({ where: { id: id } });
    const {
      password,
      emailToken,
      createdAt,
      updatedAt,
      ...userWithoutSensitiveInfo
    } = user.dataValues;

    return { status: true, data: userWithoutSensitiveInfo };
  } catch (error) {
    return { status: false };
  }
};

module.exports.forgotPassword = async (email) => {
  try {
    const existingEmail = await User.findOne({ where: { email: email } });

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
    const link = `http://localhost:3000/api/User/reset-password/${existingEmail.id}/${token}`;
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
    const oldUser = await User.findOne({ where: { id: id } });

    if (!oldUser) {
      return { status: false, message: "User Not Exist" };
    }
    const secret = process.env.JWT_SECRET + oldUser.dataValues.password;
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
    const oldUser = await User.findOne({ where: { id: id } });
    if (!oldUser) {
      return { status: false, message: "User Not Exist" };
    }
    const secret = process.env.JWT_SECRET + oldUser.dataValues.password;
    const decoded = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(newPassword.toString(), 8);
    await User.update(
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
    let user = await User.findOne({ where: { emailToken: emailToken } });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", error: "User not found" });
    }

    await User.update(
      { isVerifiedEmail: true, emailToken: null },
      { where: { emailToken: emailToken } }
    );
    return { status: "Success", message: "User verified successfully" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};





module.exports.updatePassword = async (token, data) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const User = await User.findOne({
      where: {
        id: id,
      },
    });
    console.log(data);
    const isMatch = await bcrypt.compare(
      data.OldPassword.toString(),
      User.password
    );

    if (!isMatch) {
      return { status: false, message: "User not found" };
    }
    const hashedPassword = await bcrypt.hash(data.Password.toString(), 10);

    await User.update(
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
    const existingContact = await contacts.findOne({ where: { email: email } });
    if (existingContact) {
      return { success: false, message: 'Email already exists. Please use a different email address.' };
    }

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



