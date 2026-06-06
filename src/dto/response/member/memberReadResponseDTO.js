class AdminReadResponseDTO {
  id;

  name;

  content;

  MemberImageList;

  constructor(data) {
    this.id = data?.id;
    this.name = data?.name;
    this.content = data?.content;
    this.MemberImageList = data?.MemberImages;
  }
}

module.exports = AdminReadResponseDTO;
