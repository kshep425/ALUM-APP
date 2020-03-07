const bcrypt = require("bcryptjs")

module.exports = function (sequelize, DataTypes) {
    console.log('Create Member Table')
    var Member = sequelize.define("Member", {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        prefix: {
            type: DataTypes.STRING
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        suffix: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING
        },
        // Home Address
        street_address_1: {
            type: DataTypes.STRING
        },
        street_address_2: {
            type: DataTypes.STRING
        },
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.INTEGER(5),

        occupation: DataTypes.STRING,
        member_type: DataTypes.STRING,
        member_marital_status: DataTypes.STRING
    });

    Member.associate = function (models) {
        models.Member.hasMany(models.Degree);
    }

    Member.associate = function (models) {
        models.Member.hasMany(models.Payment);
    }

    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    Member.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    // Before a User is created, we will automatically hash their password
    Member.addHook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return Member;
};
