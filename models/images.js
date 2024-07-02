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

  images.associate = (models) => {
    images.belongsTo(models.user, {
      foreignKey: "userId", // This is the foreign key in the post table referencing users's id
      targetKey: "id", // The target key in the user table to which the foreign key in the post table refers
    });
  };

  return images;
};
