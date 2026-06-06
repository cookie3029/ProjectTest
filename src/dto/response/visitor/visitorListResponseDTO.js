class VisitorListResponseDTO {
  visitorList;

  constructor(data) {
    let list = [];

    data.map((value) => {
      list.push(value.dataValues);
    });

    this.visitorList = list;
  }
}

module.exports = VisitorListResponseDTO;
