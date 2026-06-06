const { Sequelize, DataTypes } = require("sequelize");

module.exports = class InquiryPost extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        visitorId: {
          type: DataTypes.BIGINT,
          comment: "운영자 식별자",
        },
        categoryId: {
          type: DataTypes.BIGINT,
          comment: "카테고리 식별자",
        },
        contactContent: {
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
    db.InquiryPost.belongsTo(db.Visitor, {
      foreignKey: { name: "visitorId", onDelete: "CASCADE", as: "Visitor" },
    });

    db.InquiryPost.belongsTo(db.InquiryCategory, {
      foreignKey: { name: "categoryId", onDelete: "CASCADE", as: "Category" },
    });

    db.InquiryPost.hasMany(db.File, {
      foreignKey: {
        name: "inquiryPostId",
        onDelete: "CASCADE",
        as: "Files",
      },
    });
  }

  static getIncludeAttributes() {
    return ["id", "content", "createdAt", "updatedAt"];
  }
};
