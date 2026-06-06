class InquiryCategoryReadRequestDTO {
  id;

  categoryName;

  constructor(data) {
    this.id = data?.id;
    this.categoryName = data?.categoryName;
  }
}

module.exports = InquiryCategoryReadRequestDTO;
