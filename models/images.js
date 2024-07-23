module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define("images", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    docname: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  });


  return images;
};
