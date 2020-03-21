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
    host: DataTypes.STRING
  });

  return Event;
};
