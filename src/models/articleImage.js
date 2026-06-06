const { Sequelize, DataTypes } = require("sequelize");

module.exports = class ArticleImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        articleId: {
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
    db.ArticleImage.belongsTo(db.Article, {
      foreignKey: { name: "articleId", onDelete: "CASCADE", as: "Article" },
    });
  }

  static getIncludeAttributes() {
    return ["id", "imageUrl", "createdAt", "updatedAt"];
  }
};
