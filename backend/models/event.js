module.exports = function(sequelize, DataTypes) {
  let Event = sequelize.define("event", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    type: DataTypes.STRING,
    address: DataTypes.STRING,
    venueName: DataTypes.STRING,
    ticketType: DataTypes.STRING,
    //string? or integer for hostUid
    hostUid: DataTypes.STRING
  });

  Event.associate = function(models) {
    Event.belongsToMany(models.Member, { through: "event_members" });
  };

  return Event;
};
