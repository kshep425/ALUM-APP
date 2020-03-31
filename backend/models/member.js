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
        fullName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
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
        streetAddress1: {
            type: DataTypes.STRING
        },
        streetAddress2: {
            type: DataTypes.STRING
        },
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.INTEGER(5),

        occupation: DataTypes.STRING,
        memberType: DataTypes.STRING,
        memberMaritalStatus: DataTypes.STRING,
        googleToken: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        uid: DataTypes.STRING,
        role: DataTypes.STRING,
    });

    Member.associate = function (models) {
        models.Member.hasMany(models.Degree);
    }

    Member.associate = function (models) {
        models.Member.hasMany(models.Payment);
    }

    Member.associate = function (models) {
      models.Member.hasMany(models.Event);
  }

    return Member;
};
