class InquiryCategoryReadResponseDTO {
  id;

  Admin;

  categoryName;

  InquiryPostList;

  constructor(data) {
    this.id = data?.id;
    this.Admin = data?.Admin;
    this.categoryName = data?.categoryName;
    this.InquiryPostList = data?.InquiryPosts;
  }
}

module.exports = InquiryCategoryReadResponseDTO;
