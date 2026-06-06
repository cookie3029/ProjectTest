class AdminReadNameListResponseDTO {
  ids;

  constructor(data) {
    this.ids = data?.ids;
  }
}

module.exports = AdminReadNameListResponseDTO;
