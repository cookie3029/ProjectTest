class ArticleCreateRequestDTO {
  adminId;

  categoryId;

  content;

  constructor(data) {
    this.adminId = data?.adminId;
    this.categoryId = data?.categoryId;
    this.content = data?.content;
  }
}

module.exports = ArticleCreateRequestDTO;
