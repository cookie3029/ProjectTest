const { Sequelize, DataTypes } = require("sequelize");

module.exports = class About extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          comment: "내용",
        },
      },
      {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        paranoid: true,
      },
    );
  }

  static associate(db) {
    db.About.hasMany(db.AboutImage, {
      foreignKey: {
        name: "aboutId",
        onDelete: "CASCADE",
        as: "AboutImages",
      },
    });
  }

  static getIncludeAttributes() {
    return ["id", "categoryName", "createdAt", "updatedAt"];
  }
};
