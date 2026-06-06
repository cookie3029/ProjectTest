const { Sequelize, DataTypes } = require("sequelize");

module.exports = class Member extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(100),
          comment: "멤버 이름",
          allowNull: false,
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
    db.Member.hasMany(db.MemberImage, {
      foreignKey: {
        name: "memberId",
        onDelete: "CASCADE",
        as: "MemberImages",
      },
    });
  }

  static getIncludeAttributes() {
    return ["id", "categoryName", "createdAt", "updatedAt"];
  }
};
