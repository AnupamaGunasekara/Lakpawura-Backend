const userRepository = require("../Repositories/user");
const JwtService = require("./JwtService");

module.exports.adduser = async (data) => {
  try {
    const created = await userRepository.adduser(data);
    if (created.status) {
      const tokenData = { id: created.id, name: data.name, role: "user" };
      const recived = JwtService.createToken(tokenData);
      return recived;
    } else if (created.message == "already registered email") {
      return { status: false, message: "already registered email" };
    } else {
      return created;
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.loginuser = async (data) => {
  try {
    const avalable = await userRepository.loginuser(data);


    if (avalable.status) {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "user",
      };
      const recived = JwtService.createToken(tokenData);

      return recived;
    } else {
      return { status: false, message: "Invalid credentials" };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.updateBasicDetails = async (data) => {
  try {
    console.log("zzzzzzzzzzzzzzz")
    const created = await userRepository.updateBasicDetails(data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getBasicDetails = async (id) => {
  try {
    const created = await userRepository.getBasicDetails(id);
    if (created.status) {
      return { status: true, data: created.data };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.forgotPassword = async (email) => {
  try {
    const created = await userRepository.forgotPassword(email);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.resetPassword = async (id, token) => {
  try {
    const created = await userRepository.resetPassword(id, token);
    if (created.status) {
      return { status: true };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.addNewPassword = async (id, token, newPassword) => {
  try {
    const created = await userRepository.addNewPassword(
      id,
      token,
      newPassword
    );
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};



module.exports.verifyEmail = async (emailToken) => {
  try {
    const created = await userRepository.verifyEmail(emailToken);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};





module.exports.updatePassword = async (token, data) => {
  try {
    const created = await userRepository.updatePassword(token, data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};


module.exports.fileUpload = async (userId, fileData) => {
  try {
    // Process the files as needed (e.g., save to the database)
    await userRepository.fileUpload(userId, fileData);
  } catch (error) {
    throw new Error("Error processing files: " + error.message);
  }
};

module.exports.contactUs = async (
  firstName,
  lastName,
  email,
  phone,
  message
) => {
  try {
    console.log(firstName);
    const result = await userRepository.contactUs(
      firstName,
      lastName,
      email,
      phone,
      message
    );
  } catch (error) {
    console.error("Error handling contact form submission:", error);
  }
};


module.exports.getPosts = async () => {
  try {
   const data =  await userRepository.getPosts();
   return data;
  } catch (error) {
    throw new Error("Error : " + error.message);
  }
};


module.exports.updatebasicdetailswithpassword = async (token, data) => {
  try {
    const created = await userRepository.updatebasicdetailswithpassword(token, data);
    return created;
  } catch (error) {
    return { status: false, message: error.message };
  }
};