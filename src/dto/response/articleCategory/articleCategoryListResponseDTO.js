class InquiryCategoryListResponseDTO {
  categoryList;

  constructor(data) {
    let list = [];

    data.map((value) => {
      list.push(value.dataValues);
    });

    this.categoryList = list;
  }
}

module.exports = InquiryCategoryListResponseDTO;
