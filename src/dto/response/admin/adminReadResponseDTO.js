class AdminReadResponseDTO {
  id;

  email;

  password;

  name;

  phone;

  address;

  articleList;

  ArticleCategoryList;

  InquiryCategoryList;

  isActivated;

  constructor(data) {
    this.id = data?.id;
    this.email = data?.email;
    this.password = data?.password;
    this.name = data?.name;
    this.phone = data?.phone;
    this.address = data?.address;
    this.articleList = data?.Articles;
    this.ArticleCategoryList = data?.ArticleCategories;
    this.InquiryCategoryList = data?.InquiryCategories;
    this.isActivated = data?.isActivated;
  }
}

module.exports = AdminReadResponseDTO;
