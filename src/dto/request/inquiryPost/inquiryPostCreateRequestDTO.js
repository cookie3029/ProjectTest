class InquiryPostCreateRequestDTO {
  visitorId;

  categoryId;

  contactContent;

  constructor(data) {
    this.visitorId = data?.visitorId;
    this.categoryId = data?.categoryId;
    this.contactContent = data?.contactContent;
  }
}

module.exports = InquiryPostCreateRequestDTO;
