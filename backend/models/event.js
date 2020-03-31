module.exports = function(sequelize, DataTypes) {
  let Event = sequelize.define("Event", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    type: DataTypes.STRING,
    address: DataTypes.STRING,
    venueName: DataTypes.STRING,
    ticketType: DataTypes.STRING,
    hostName: DataTypes.STRING,
    hostEmail: DataTypes.STRING,
    creatorId: DataTypes.STRING
  });

  Event.associate = function (models) {
    models.Event.belongsTo(models.Member, {
        onDelete: "CASCADE",
        foreignKey: {
            allowNull: true
        }
    });
};

  return Event;
};
