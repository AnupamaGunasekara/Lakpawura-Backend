module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  // post.associate = (models) => {
  //   post.belongsTo(models.user, {
  //     foreignKey: "userId", // This is the foreign key in the post table referencing users's id
  //     targetKey: "id", // The target key in the user table to which the foreign key in the post table refers
  //   });
  //   post.hasMany(models.images, {
  //     foreignKey: "commentId",
  //   });
  // };

  post.associate = (models) => {
    post.hasMany(models.comment, { foreignKey: "postId" }); 
    post.hasMany(models.images, { foreignKey: "postId" }); 
    post.hasMany(models.reply, { foreignKey: "postId" }); 
  }; 


  return post;
};
