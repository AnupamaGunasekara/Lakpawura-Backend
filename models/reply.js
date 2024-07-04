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



    return Reply;
};
