class AdminReadRequestDTO {
  id;

  name;

  email;

  constructor(data) {
    this.id = data?.id;
    this.name = data?.name;
    this.email = data?.email;
  }
}

module.exports = AdminReadRequestDTO;
