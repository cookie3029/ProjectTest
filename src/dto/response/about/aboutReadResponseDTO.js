class AboutReadResponseDTO {
  id;

  name;

  content;

  AboutImageList;

  constructor(data) {
    this.id = data?.id;
    this.name = data?.name;
    this.content = data?.content;
    this.AboutImageList = data?.AboutImages;
  }
}

module.exports = AboutReadResponseDTO;
