module.exports = (sequelize, DataTypes) => {
  const interacts = sequelize.define("interacts", {
    interactIncrement: { 
      type: DataTypes.INTEGER,
      defaultValue: 120,
    },
    });
  return interacts;
};
