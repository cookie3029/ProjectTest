const { Sequelize, DataTypes } = require("sequelize");

module.exports = class MemberImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        memberId: {
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
    db.MemberImage.belongsTo(db.Member, {
      foreignKey: { name: "memberId", onDelete: "CASCADE", as: "Member" },
    });
  }

  static getIncludeAttributes() {
    return ["id", "imageUrl", "createdAt", "updatedAt"];
  }
};
