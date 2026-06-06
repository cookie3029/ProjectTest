class AboutListResponseDTO {
  aboutList;

  constructor(data) {
    let list = [];

    data.map((value) => {
      list.push(value.dataValues);
    });

    this.aboutList = list;
  }
}

module.exports = AboutListResponseDTO;
