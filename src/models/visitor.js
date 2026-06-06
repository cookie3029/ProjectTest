const { Sequelize, DataTypes } = require("sequelize");

module.exports = class Visitor extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(100),
          comment: "방문자 이름",
          allowNull: false,
        },
        gender: {
          type: DataTypes.STRING(10),
          comment: "방문자 성별",
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50),
          comment: "방문자 이메일",
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(255),
          comment: "방문자 연락처",
          allowNull: false,
        },
        broadExpStory: {
          type: DataTypes.TEXT,
          comment: "방송 경험",
          allowNull: true,
        },
        isAvailableCondition: {
          type: DataTypes.BOOLEAN,
          comment: "주 3회 방송 가능 여부",
          allowNull: true,
          defaultValue: true,
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
    db.Visitor.hasMany(db.InquiryPost, {
      foreignKey: {
        name: "visitorId",
        onDelete: "CASCADE",
        as: "InquiryPosts",
      },
    });
  }

  static getIncludeAttributes() {
    return [
      "id",
      "name",
      "gender",
      "email",
      "phone",
      "broadExpStory",
      "isAvailableCondition",
    ];
  }
};
