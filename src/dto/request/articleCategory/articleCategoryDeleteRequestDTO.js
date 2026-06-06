class ArticleCategoryDeleteRequestDTO {
  id;

  constructor(data) {
    this.id = data?.id;
  }
}

module.exports = ArticleCategoryDeleteRequestDTO;
