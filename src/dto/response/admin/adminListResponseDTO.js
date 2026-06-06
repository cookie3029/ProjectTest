class AdminListResponseDTO {
  adminList;

  constructor(data) {
    let list = [];

    data.map((value) => {
      list.push(value.dataValues);
    });

    this.adminList = list;
  }
}

module.exports = AdminListResponseDTO;
