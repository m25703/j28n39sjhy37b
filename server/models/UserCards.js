module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastClick: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
    },
    lastIncrement: {
      type: DataTypes.FLOAT,
      defaultValue: 1,
    },
  });
  return Posts;
};
