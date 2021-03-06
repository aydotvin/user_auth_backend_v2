const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  log.debug(sequelize.fn("NOW"));
  return sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hashed_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
      },
      last_modified: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
};
