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
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull: true,
  }
  });



  post.associate = (models) => {
    post.hasMany(models.comment, { foreignKey: "postId" }); 
    post.hasMany(models.images, { foreignKey: "postId" }); 
    post.hasMany(models.reply, { foreignKey: "postId" }); 
  }; 


  return post;
};
