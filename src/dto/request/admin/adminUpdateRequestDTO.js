class AdminUpdateRequestDTO {
  id;

  password;

  name;

  phone;

  address;

  isActivated;

  constructor(data) {
    this.id = Number(data?.id);
    this.password = data?.password;
    this.name = data?.name;
    this.phone = data?.phone;
    this.address = data?.address;
    this.isActivated = data?.isActivated;
  }
}

module.exports = AdminUpdateRequestDTO;
