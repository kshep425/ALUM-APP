module.exports = function(sequelize, DataTypes) {
  let Event = sequelize.define("Event", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    // type: DataTypes.STRING,
    // address: DataTypes.STRING,
    // city: DataTypes.STRING,
    // state: DataTypes.STRING,
    // zipcode: DataTypes.INTEGER,
    // venueName: DataTypes.STRING
  });

  return Event;
};
