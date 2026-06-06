class MemberCreateResponseDTO {
  id;

  name;

  content;

  constructor(data) {
    this.id = data?.id;
    this.name = data?.name;
    this.content = data?.content;
  }
}

module.exports = MemberCreateResponseDTO;
