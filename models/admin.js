module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define("admin", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return admin;
};
