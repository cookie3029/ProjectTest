class AboutListResponseDTO {
  articleList;

  constructor(data) {
    let list = [];

    data.map((value) => {
      list.push(value.dataValues);
    });

    this.articleList = list;
  }
}

module.exports = AboutListResponseDTO;
