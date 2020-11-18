module.exports = function (sequelize, DataTypes) {
    console.log("Create Payment Table")
    var Payment = sequelize.define("Payment", {
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },

        currency: {
          type: DataTypes.STRING,
          defaultValue: 'usd'
        },

        description: {
            type: DataTypes.STRING
        },

        uid: {
            type: DataTypes.STRING
        },

        comment: {
          type: DataTypes.STRING
        },

        paypalPayerId: {
          type: DataTypes.STRING
        },

        paypalOrderId: {
          type: DataTypes.STRING
        },

        categoryId: {
          type: DataTypes.STRING
        },

        otherMemberName: {
          type: DataTypes.STRING
        },

        otherMemberEmail: {
          type: DataTypes.STRING
        },

        otherMemberId: {
          type: DataTypes.INTEGER
        },

        fee: {
          type: DataTypes.DOUBLE
        }

    });

    // This allows progress id to be a foreign key in the Payment table.
    Payment.associate = function (models) {
        models.Payment.belongsTo(models.Member, {
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Payment;
};
