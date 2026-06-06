class VisitorDeleteRequestDTO {
  id;

  isActivate;

  constructor(data) {
    this.id = data?.id;
    this.isActivate = data?.isActivate;
  }
}

module.exports = VisitorDeleteRequestDTO;
