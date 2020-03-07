module.exports = function (sequelize, DataTypes) {
    console.log("Create Payment Table")
    var Payment = sequelize.define("Payment", {
        // The username to login to the site
        payment_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        // The password cannot be null
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
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
