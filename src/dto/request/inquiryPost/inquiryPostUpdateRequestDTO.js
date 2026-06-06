class InquiryPostUpdateRequestDTO {
  id;

  contactContent;

  constructor(data) {
    this.id = Number(data?.id);
    this.contactContent = data?.contactContent;
  }
}

module.exports = InquiryPostUpdateRequestDTO;
