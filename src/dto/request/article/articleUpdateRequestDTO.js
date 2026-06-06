class ArticleUpdateRequestDTO {
  id;

  content;

  constructor(data) {
    this.id = Number(data?.id);
    this.content = data?.content;
  }
}

module.exports = ArticleUpdateRequestDTO;
