class InquiryCategoryCreateRequestDTO {
  adminId;

  categoryName;

  constructor(data) {
    this.adminId = data?.adminId;
    this.categoryName = data?.categoryName;
  }
}

module.exports = InquiryCategoryCreateRequestDTO;
