const { Sequelize, DataTypes } = require("sequelize");

module.exports = class ArticleCategory extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        adminId: {
          type: DataTypes.BIGINT,
          comment: "운영자 식별자",
        },
        categoryName: {
          type: DataTypes.STRING(50),
          comment: "카테고리 이름",
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
    db.ArticleCategory.belongsTo(db.Admin, {
      foreignKey: { name: "adminId", onDelete: "CASCADE", as: "Admin" },
    });

    db.ArticleCategory.hasMany(db.Article, {
      foreignKey: {
        name: "categoryId",
        onDelete: "CASCADE",
        as: "Article",
      },
    });
  }

  static getIncludeAttributes() {
    return ["id", "categoryName", "createdAt", "updatedAt"];
  }
};
