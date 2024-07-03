module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Comment.associate = (models) => {
    //     Comment.belongsTo(models.user, {
    //         foreignKey: "userId",
    //         targetKey: "id",
    //     });
    //     Comment.belongsTo(models.post, {
    //         foreignKey: "postId",
    //         targetKey: "id",
    //     });
    // };

    return Comment;
}; 
