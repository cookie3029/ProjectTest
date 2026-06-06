const { Sequelize, DataTypes } = require("sequelize");

module.exports = class Article extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        adminId: {
          type: DataTypes.BIGINT,
          comment: "운영자 식별자",
        },
        categoryId: {
          type: DataTypes.BIGINT,
          comment: "카테고리 식별자",
        },
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
    db.Article.belongsTo(db.Admin, {
      foreignKey: { name: "adminId", onDelete: "CASCADE", as: "Admin" },
    });

    db.Article.belongsTo(db.ArticleCategory, {
      foreignKey: {
        name: "categoryId",
        onDelete: "CASCADE",
        as: "ArticleCategory",
      },
    });

    db.Article.hasMany(db.ArticleImage, {
      foreignKey: {
        name: "articleId",
        onDelete: "CASCADE",
        as: "ArticleImages",
      },
    });
  }

  static getIncludeAttributes() {
    return ["id", "content", "createdAt", "updatedAt"];
  }
};
