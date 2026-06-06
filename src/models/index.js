const { sequelize } = require("./connection");

const Admin = require("./admin");
const About = require("./about");
const Member = require("./member");
const Article = require("./article");
const AboutImage = require("./aboutImage");
const MemberImage = require("./memberImage");
const ArticleImage = require("./articleImage");
const ArticleCategory = require("./articleCategory");
const InquiryCategory = require("./inquiryCategory");
const InquiryPost = require("./inquiryPost");
const Visitor = require("./visitor");
const File = require("./File");

const db = {};

db.sequelize = sequelize;

db.File = File;
db.Admin = Admin;
db.About = About;
db.Member = Member;
db.Visitor = Visitor;
db.Article = Article;
db.AboutImage = AboutImage;
db.MemberImage = MemberImage;
db.ArticleImage = ArticleImage;
db.InquiryPost = InquiryPost;
db.ArticleCategory = ArticleCategory;
db.InquiryCategory = InquiryCategory;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].init) {
    db[modelName].init(sequelize);
  }
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
