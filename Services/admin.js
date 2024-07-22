const adminRepository = require("../Repositories/admin");
const JwtService = require("./JwtService");

module.exports.addadmin = async (data) => {
  try {
    if (data.adminType === "admin" || data.adminType == undefined) {
      const created = await adminRepository.addadmin(data);
      if (created.status) {
        const tokenData = {
          id: created.id,
          name: data.name,
          role: "admin",
        };
        const recived = JwtService.createToken(tokenData);
        return recived;
      } else if (created.message == "already registered user") {
        return { status: false, message: "already registered user" };
      } else {
        return created;
      }
    } else {
      console.log("new here")
      const created = await DataEntryRepository.addSecondAdmin(data);
      if (created.status) {
        const tokenData = {
          id: created.id,
          name: data.name,
          role: "admin",
        };
        const recived = JwtService.createToken(tokenData);
        return recived;
      } else if (created.message == "already registered user") {
        return { status: false, message: "already registered user" };
      } else {
        return created;
      }
    }
  } catch (error) {
    return { status: false, message: error.message };
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



