class AboutCreateRequestDTO {
  content;

  constructor(data) {
    this.content = data?.content;
  }
}

module.exports = AboutCreateRequestDTO;
