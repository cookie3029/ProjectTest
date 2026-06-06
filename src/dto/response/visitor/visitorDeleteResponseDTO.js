class VisitorDeleteResponseDTO {
  deletedCount;

  responseToken;

  constructor(data) {
    this.deletedCount = data?.deleted;
    this.responseToken = data?.responseTokenDTO;
  }
}

module.exports = VisitorDeleteResponseDTO;
