class InquiryCategoryListResponseDTO {
  inquiryPostList;

  constructor(data) {
    let list = [];

    data.map((value) => {
      list.push(value.dataValues);
    });

    this.inquiryPostList = list;
  }
}

module.exports = InquiryCategoryListResponseDTO;
