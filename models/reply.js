module.exports = (sequelize, DataTypes) => {
    const Reply = sequelize.define("reply", {
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

    // Reply.associate = (models) => {
    //     Reply.belongsTo(models.user, {
    //         foreignKey: "userId",
    //         targetKey: "id",
    //     });
    //     Reply.belongsTo(models.comment, {
    //         foreignKey: "commentId",
    //         targetKey: "id",
    //     });
    // };

    return Reply;
};
