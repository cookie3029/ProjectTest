class ArticleCategoryCreateRequestDTO {
  adminId;

  categoryName;

  constructor(data) {
    this.adminId = data?.adminId;
    this.categoryName = data?.categoryName;
  }
}

module.exports = ArticleCategoryCreateRequestDTO;
