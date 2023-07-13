module.exports = (sequelize, DataTypes) => {
    const UserCards = sequelize.define("UserCards", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      cardData: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Additional columns for user-card interactions
      // e.g., date/time of interaction, specific changes made, etc.
      interactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  
    UserCards.associate = (models) => {
      UserCards.belongsTo(models.Users, {
        foreignKey: "userId",
      });
      UserCards.belongsTo(models.Posts, {
        foreignKey: "cardId",
      });
    };
  
    return UserCards;
  };
  