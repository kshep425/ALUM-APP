/**
 * Members degree information is stored in this table
 * A member can have more than one degree
*/
module.exports = function (sequelize, DataTypes) {
    console.log("Create Degree Table")
    var Degree = sequelize.define("Degree", {
        degree: DataTypes.STRING,
        year: DataTypes.INTEGER(4),
        uid: DataTypes.STRING,
    });

    Degree.associate = function (models) {
        models.Degree.belongsTo(models.Member, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            }
        });
    };
    return Degree;
};
