const { Sequelize, DataTypes } = require("sequelize");

module.exports = class AboutImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        aboutId: {
          type: DataTypes.BIGINT,
          comment: "게시글 식별자",
        },
        imageUrl: {
          type: DataTypes.TEXT,
          comment: "이미지 URL",
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
    db.AboutImage.belongsTo(db.About, {
      foreignKey: { name: "aboutId", onDelete: "CASCADE", as: "About" },
    });
  }

  static getIncludeAttributes() {
    return ["id", "imageUrl", "createdAt", "updatedAt"];
  }
};
