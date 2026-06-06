class AboutReadRequestDTO {
  id;

  content;

  constructor(data) {
    this.id = data?.id;
  }
}

module.exports = AboutReadRequestDTO;
