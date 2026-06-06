const { About, AboutImage } = require("@models/index");

// CRUD
const AboutCreateResponseDTO = require("@aboutResponseDTO/aboutCreateResponseDTO");
const AboutReadResponseDTO = require("@aboutResponseDTO/aboutReadResponseDTO");
const AboutUpdateResponseDTO = require("@aboutResponseDTO/aboutUpdateResponseDTO");
const AboutDeleteResponseDTO = require("@aboutResponseDTO/aboutDeleteResponseDTO");
const AboutListResponseDTO = require("@aboutResponseDTO/aboutListResponseDTO");

const aboutDao = {
  insert: async (requestDTO) =>
    new Promise((resolve, reject) => {
      About.create(requestDTO)
        .then((inserted) => {
          const newInserted = JSON.parse(JSON.stringify(inserted));
          const aboutCreateResponseDTO = new AboutCreateResponseDTO(
            newInserted,
          );

          resolve(aboutCreateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectInfo: async (requestDTO) =>
    new Promise((resolve, reject) => {
      About.findByPk(requestDTO.id, {
        include: [
          {
            model: AboutImage,
            as: "AboutImages",
            attributes: AboutImage.getIncludeAttributes(),
          },
        ],
      })
        .then((selectInfo) => {
          const aboutReadResponseDTO = new AboutReadResponseDTO(selectInfo);

          resolve(aboutReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectAbout: async (requestDTO) =>
    new Promise((resolve, reject) => {
      About.findOne({
        where: [{ id: requestDTO.id }],
      })
        .then((selectedInfo) => {
          const aboutReadResponseDTO = new AboutReadResponseDTO(selectedInfo);

          resolve(aboutReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  getAllAboutInfo: async () =>
    new Promise((resolve, reject) => {
      About.findAll({
        include: [
          {
            model: AboutImage,
            as: "AboutImages",
            attributes: AboutImage.getIncludeAttributes(),
          },
        ],
      })
        .then((selectedInfos) => {
          const aboutListResponseDTO = new AboutListResponseDTO(selectedInfos);

          console.log(aboutListResponseDTO.aboutList);

          resolve(aboutListResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  update: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      About.update(requestDTO, {
        where: { id: requestDTO.id },
      })
        .then(([updated]) => {
          const aboutUpdateResponseDTO = new AboutUpdateResponseDTO({
            ...responseTokenDTO,
            updated,
          });

          resolve(aboutUpdateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  delete: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      About.destroy({
        where: { id: requestDTO.id },
      })
        .then((deleted) => {
          const aboutDeleteResponeDTO = new AboutDeleteResponseDTO({
            responseTokenDTO,
            deleted,
          });

          resolve(aboutDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  deleteForce: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      About.destroy({
        where: { id: requestDTO.id },
        force: true,
      })
        .then((deleted) => {
          const aboutDeleteResponeDTO = new AboutDeleteResponseDTO({
            responseTokenDTO,
            deleted,
          });

          resolve(aboutDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
};

module.exports = aboutDao;
