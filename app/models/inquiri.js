"use strict";

module.exports = (sequelize, DataTypes) => {
  const inquirie = sequelize.define(
    "inquirie",
    {
      description: {
        type: DataTypes.STRING,
      },
      topic_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "inquiries",
    }
  );

  inquirie.associate = function (models) {};

  return inquirie;
};
