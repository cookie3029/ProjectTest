class InquiryCategoryUpdateRequestDTO {
  id;

  categoryName;

  constructor(data) {
    this.id = Number(data?.id);
    this.categoryName = data?.categoryName;
  }
}

module.exports = InquiryCategoryUpdateRequestDTO;
