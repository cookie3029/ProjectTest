class InquiryPostCreateResponseDTO {
  id;

  visitorId;

  categoryId;

  contactContent;

  constructor(data) {
    this.id = data?.id;
    this.visitorId = data?.visitorId;
    this.categoryId = data?.categoryId;
    this.contactContent = data?.contactContent;
  }
}

module.exports = InquiryPostCreateResponseDTO;
