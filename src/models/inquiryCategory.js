const { Sequelize, DataTypes } = require("sequelize");

module.exports = class InquiryCategory extends Sequelize.Model {
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
    db.InquiryCategory.belongsTo(db.Admin, {
      foreignKey: { name: "adminId", onDelete: "CASCADE", as: "Admin" },
    });

    db.InquiryCategory.hasMany(db.InquiryPost, {
      foreignKey: {
        name: "categoryId",
        onDelete: "CASCADE",
        as: "InquiryPosts",
      },
    });
  }

  static getIncludeAttributes() {
    return ["id", "categoryName", "createdAt", "updatedAt"];
  }
};
