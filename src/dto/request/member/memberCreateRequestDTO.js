class MemberCreateRequestDTO {
  name;

  content;

  constructor(data) {
    this.name = data?.name;
    this.content = data?.content;
  }
}

module.exports = MemberCreateRequestDTO;
