class AdminUpdateResponseDTO {
  updatedCount;

  responseToken;

  constructor(data) {
    this.updatedCount = data?.updatedCount;
    this.responseToken = data?.responseTokenDTO;
  }
}

module.exports = AdminUpdateResponseDTO;
