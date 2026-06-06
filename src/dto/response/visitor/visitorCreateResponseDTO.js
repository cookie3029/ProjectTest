class VisitorCreateResponseDTO {
  id;

  name;

  gender;

  birthDate;

  phone;

  email;

  broadExpStory;

  isAvailableCondition;

  constructor(data) {
    this.id = data?.id;
    this.name = data?.name;
    this.gender = data?.gender;
    this.birthDate = data?.birthDate;
    this.phone = data?.phone;
    this.email = data?.email;
    this.broadExpStory = data?.broadExpStory;
    this.isAvailableCondition = data?.isAvailableCondition;
  }
}

module.exports = VisitorCreateResponseDTO;
