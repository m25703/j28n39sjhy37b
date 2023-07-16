module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    increment: { 
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  //   updatedAt: {
  //     type: DataTypes.DATE,
  //     allowNull: false,
  //     defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  //     onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
  //   },
  // }, {
  //   timestamps: true, // Enable timestamps (createdAt, updatedAt)
  //   updatedAt: 'updatedAt', // Specify the name of the updatedAt field
  });
  return Likes;
};
