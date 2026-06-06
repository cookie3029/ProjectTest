class LoginResponseDTO {
  isSuccess;

  accessToken;

  refreshToken;

  adminInfo;

  constructor(data) {
    this.isSuccess = !!data?.accessToken;
    this.accessToken = data?.accessToken;
    this.refreshToken = data?.refreshToken;
    this.adminInfo = data?.adminInfo;
  }
}

module.exports = LoginResponseDTO;
