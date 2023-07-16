module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    likeIncrement: { 
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    });
  return Likes;
};
