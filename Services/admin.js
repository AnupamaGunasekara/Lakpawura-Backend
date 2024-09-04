const adminRepository = require("../Repositories/admin");
const JwtService = require("./JwtService");
const crypto = require('crypto');
const { sendMail } = require('../utils/sendVerificationMail'); // Assuming you have an email service


module.exports.addadmin = async (data) => {
  try {
    const created = await adminRepository.addadmin(data);
    if (created.status) {
      const tokenData = {
        id: created.id,
        name: data.name,
        role: "admin",
      };
      const recived = JwtService.createToken(tokenData);
      return recived;
    } else {
      return created;
    }
  } catch (error) {
    return { status: false, message: created.message };
  }
};

module.exports.addFirstAdmin = async (data) => {
  try {
    const created = await adminRepository.addFirstAdmin(data);
    if (created.status) {
      const tokenData = {
        id: created.id,
        name: data.name,
        role: "admin",
      };
      const recived = JwtService.createToken(tokenData);
      return recived;
    } else {
      return created;
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.loginadmin = async (data) => {
  try {
    const avalable = await adminRepository.loginadmin(data);
    if (avalable.status && avalable.type === "admin") {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "admin",
      };
      const recived = JwtService.createToken(tokenData);

      return recived;
    } else if (avalable.status && avalable.type === "secondAdmin") {
      const tokenData = {
        id: avalable.id,
        name: avalable.name,
        role: "secondAdmin",
      };
      const recived = JwtService.createToken(tokenData);
      return recived;
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports.getmessages = async () => {
  try {
    const messages = await adminRepository.getmessages();
    return messages;
  } catch (error) {
    throw new Error(`Error while fetching taxpayers: ${error.message}`);
  }
};



module.exports.getmessages = async () => {
  try {
    const messages = await adminRepository.getmessages();
    return messages;
  } catch (error) {
    throw new Error(`Error while fetching users: ${error.message}`);
  }
};

module.exports.removepost = async (id) => {
  try {
    await adminRepository.removepost(id);
    return { message: 'post deleted successfully' };
  } catch (error) {
    throw new Error(`Error while deleting taxpayer: ${error.message}`);
  }
};

const composeMail = require("../utils/composeMail");

module.exports.sendreply = async (email, reply) => {
  try {
    composeMail(email,reply);
    return { message: "message sent successfully" };
  } catch (error) {
    throw new Error(`Error while sending sentmail: ${error.message}`);
  }
};


module.exports.getBasicDetails = async (id) => {
  try {
    const created = await adminRepository.getBasicDetails(id);
    if (created.status) {
      return { status: true, data: created.data };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};


module.exports.updateAdminDetails= async (adminId, adminData) => {
    try {
      const existingAdmin = await adminRepository.findAdminById(adminId);
      
      if (existingAdmin) {
        if (adminData.email !== existingAdmin.email) {
          const emailExists = await adminRepository.findAdminByEmail(adminData.email);
          if (emailExists) {
            return { status: false, message: "Email already registered" };
          }

          adminData.emailToken = crypto.randomBytes(64).toString('hex');
          adminData.isVerifiedEmail = false;

          // Send verification email
          sendMail(adminData.name, adminData.email, adminData.emailToken);
        }

        // Update admin
        await adminRepository.updateAdmin(adminId, adminData);
        return { status: true };
      }

      return { status: false, message: "Admin not found" };
    } catch (error) {
      return { status: false, message: "An error occurred" };
    }
  };