class MemberUpdateRequestDTO {
  id;

  name;

  content;

  constructor(data) {
    this.id = Number(data?.id);
    this.name = data?.name;
    this.content = data?.content;
  }
}

module.exports = MemberUpdateRequestDTO;
