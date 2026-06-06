const { Sequelize, DataTypes } = require("sequelize");

module.exports = class File extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        InquiryPostId: {
          type: DataTypes.BIGINT,
          comment: "게시글 식별자",
        },
        filePath: {
          type: DataTypes.TEXT,
          comment: "파일 경로",
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
    db.File.belongsTo(db.InquiryPost, {
      foreignKey: {
        name: "inquiryPostId",
        onDelete: "CASCADE",
        as: "InquiryPost",
      },
    });
  }

  static getIncludeAttributes() {
    return ["id", "filePath", "createdAt", "updatedAt"];
  }
};
