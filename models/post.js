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
    review:{
      type:DataTypes.INTEGER,
      allowNull: false,
  }
  });



  post.associate = (models) => {
    post.hasMany(models.comment, { foreignKey: "postId" }); 
    post.hasMany(models.images, { foreignKey: "postId" }); 
    post.hasMany(models.reply, { foreignKey: "postId" }); 
  }; 


  return post;
};
