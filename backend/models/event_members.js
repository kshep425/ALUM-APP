module.exports = function(sequelize, DataTypes) {
  const EventMembers = sequelize.define("event_members", {
    rsvp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Yes", "No", "Maybe"]]
      }
    }
  });

  return EventMembers;
};
