class MemberDeleteRequestDTO {
  id;

  constructor(data) {
    this.id = data?.id;
  }
}

module.exports = MemberDeleteRequestDTO;
