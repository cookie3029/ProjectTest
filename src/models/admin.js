const { Sequelize, DataTypes } = require("sequelize");

module.exports = class Admin extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(50),
          comment: "운영자 이메일",
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(100),
          comment: "운영자 이름",
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(500),
          comment: "운영자 비밀번호",
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(500),
          comment: "운영자 주소",
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(255),
          comment: "연락처",
          allowNull: false,
        },
        isActivated: {
          type: DataTypes.BOOLEAN,
          comment: "인증 여부",
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
    db.Admin.hasMany(db.ArticleCategory, {
      foreignKey: {
        name: "adminId",
        onDelete: "CASCADE",
        as: "AritcleCategories",
      },
    });

    db.Admin.hasMany(db.InquiryCategory, {
      foreignKey: {
        name: "adminId",
        onDelete: "CASCADE",
        as: "InquiryCategories",
      },
    });

    db.Admin.hasMany(db.Article, {
      foreignKey: {
        name: "adminId",
        onDelete: "CASCADE",
        as: "Articles",
      },
    });
  }

  static getIncludeAttributes() {
    return ["id", "email", "name", "address", "phone", "isActivated"];
  }
};
