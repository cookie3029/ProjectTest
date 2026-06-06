class ArticleReadRequestDTO {
  id;

  Admin;

  Category;

  content;

  constructor(data) {
    this.id = data?.id;
    this.Admin = data?.Admin;
    this.Category = data?.Category;
    this.content = data?.content;
  }
}

module.exports = ArticleReadRequestDTO;
