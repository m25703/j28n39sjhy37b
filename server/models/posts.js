module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "test",
    }
  });

  Posts.associate = (models) => {
    // Posts.hasMany(models.Comments, {
    //   onDelete: "cascade",
    // });

    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
    });
  };
  return Posts;
};

