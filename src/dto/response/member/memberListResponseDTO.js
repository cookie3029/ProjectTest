class MemberListResponseDTO {
  memberList;

  constructor(data) {
    let list = [];

    data.map((value) => {
      list.push(value.dataValues);
    });

    this.memberList = list;
  }
}

module.exports = MemberListResponseDTO;
