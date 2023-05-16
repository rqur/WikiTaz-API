"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.hasMany(models.Event),
        {
          foreignKey: "groupId",
          onDelete: "cascade",
        };
      Group.belongsTo(models.User, {
        foreignKey: "organizerId",
      });
      Group.belongsToMany(models.User, {
        through: models.Membership,
        foreignKey: "groupId",
        otherKey: "userId",
      });
      Group.hasMany(models.Venue, {
        foreignKey: "groupId",
      });
      Group.hasMany(models.GroupImage, {
        foreignKey: "groupId",
      });
    }
  }
  Group.init(
    {
      organizerid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      about: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("online", "in person"),
        allowNull: false,
      },
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
