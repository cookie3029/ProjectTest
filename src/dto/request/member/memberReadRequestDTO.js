class MemberReadRequestDTO {
  id;

  name;

  constructor(data) {
    this.id = data?.id;
    this.name = data?.name;
  }
}

module.exports = MemberReadRequestDTO;
