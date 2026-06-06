class VisitorUpdateResponseDTO {
  updatedCount;

  responseToken;

  constructor(data) {
    this.updatedCount = data?.updated;
    this.responseToken = data?.responseTokenDTO;
  }
}

module.exports = VisitorUpdateResponseDTO;
