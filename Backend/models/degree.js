module.exports = function (sequelize, DataTypes) {
    console.log("Create Degree Table")
    var Degree = sequelize.define("Degree", {
        degree: DataTypes.STRING,
        year: DataTypes.INTEGER(4)
    });

    Degree.associate = function (models) {
        models.Degree.belongsTo(models.Member, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Degree;
};
