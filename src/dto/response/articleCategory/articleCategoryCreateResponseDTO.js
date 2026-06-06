class InquiryCategoryCreateResponseDTO {
  id;

  adminId;

  categoryName;

  constructor(data) {
    this.id = data?.id;
    this.adminId = data?.adminId;
    this.categoryName = data?.categoryName;
  }
}

module.exports = InquiryCategoryCreateResponseDTO;
