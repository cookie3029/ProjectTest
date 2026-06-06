class InquiryPostReadRequestDTO {
  id;

  Visitor;

  Category;

  contactContent;

  constructor(data) {
    this.id = data?.id;
    this.Visitor = data?.Visitor;
    this.Category = data?.Category;
    this.contactContent = data?.contactContent;
  }
}

module.exports = InquiryPostReadRequestDTO;
