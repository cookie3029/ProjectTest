class AdminCreateResponseDTO {
  id;

  name;

  email;

  phone;

  address;

  isActivated;

  constructor(data) {
    this.id = data?.id;
    this.email = data?.email;
    this.name = data?.name;
    this.phone = data?.phone;
    this.address = data?.address;
    this.isActivated = data?.isActivated;
  }
}

module.exports = AdminCreateResponseDTO;
