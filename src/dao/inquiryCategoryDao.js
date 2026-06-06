const { InquiryPost, InquiryCategory, Admin } = require("@models/index");

// CRUD
const InquiryCategoryCreateResponseDTO = require("@inquiryCategoryResponseDTO/inquiryCategoryCreateResponseDTO");
const InquiryCategoryReadResponseDTO = require("@inquiryCategoryResponseDTO/inquiryCategoryReadResponseDTO");
const InquiryCategoryUpdateResponseDTO = require("@inquiryCategoryResponseDTO/inquiryCategoryUpdateResponseDTO");
const InquiryCategoryDeleteResponseDTO = require("@inquiryCategoryResponseDTO/inquiryCategoryDeleteResponseDTO");
const InquiryCategoryListResponseDTO = require("@inquiryCategoryResponseDTO/inquiryCategoryListResponseDTO");

const inquiryCategoryDao = {
  insert: async (requestDTO) =>
    new Promise((resolve, reject) => {
      InquiryCategory.create(requestDTO)
        .then((inserted) => {
          const newInserted = JSON.parse(JSON.stringify(inserted));
          const inquiryCategoryCreateResponseDTO =
            new InquiryCategoryCreateResponseDTO(newInserted);

          resolve(inquiryCategoryCreateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectInfo: async (requestDTO) =>
    new Promise((resolve, reject) => {
      InquiryCategory.findByPk(requestDTO.id, {
        include: [
          {
            model: InquiryPost,
            as: "InquiryPosts",
            attributes: InquiryPost.getIncludeAttributes(),
          },
          {
            model: Admin,
            as: "Admin",
            attributes: Admin.getIncludeAttributes(),
          },
        ],
      })
        .then((selectInfo) => {
          const inquiryCategoryReadResponseDTO =
            new InquiryCategoryReadResponseDTO(selectInfo);

          resolve(inquiryCategoryReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectInquiryCategory: async (requestDTO) =>
    new Promise((resolve, reject) => {
      InquiryCategory.findOne({
        where: [{ id: requestDTO.id }],
      })
        .then((selectedInfo) => {
          const inquiryCategoryReadResponseDTO =
            new InquiryCategoryReadResponseDTO(selectedInfo);

          resolve(inquiryCategoryReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  getAllInquiryCategoryInfo: async () =>
    new Promise((resolve, reject) => {
      InquiryCategory.findAll({
        include: [
          {
            model: InquiryPost,
            as: "InquiryPosts",
            attributes: InquiryPost.getIncludeAttributes(),
          },
          {
            model: Admin,
            as: "Admin",
            attributes: Admin.getIncludeAttributes(),
          },
        ],
      })
        .then((selectedInfos) => {
          const inquiryCategoryListResponseDTO =
            new InquiryCategoryListResponseDTO(selectedInfos);

          console.log(inquiryCategoryListResponseDTO.inquiryCategoryList);

          resolve(inquiryCategoryListResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  update: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      InquiryCategory.update(requestDTO, {
        where: { id: requestDTO.id },
      })
        .then(([updated]) => {
          const inquiryCategoryUpdateResponseDTO =
            new InquiryCategoryUpdateResponseDTO({
              ...responseTokenDTO,
              updated,
            });

          resolve(inquiryCategoryUpdateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  delete: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      InquiryCategory.destroy({
        where: { id: requestDTO.id },
      })
        .then((deleted) => {
          const inquiryCategoryDeleteResponeDTO =
            new InquiryCategoryDeleteResponseDTO({
              responseTokenDTO,
              deleted,
            });

          resolve(inquiryCategoryDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  deleteForce: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      InquiryCategory.destroy({
        where: { id: requestDTO.id },
        force: true,
      })
        .then((deleted) => {
          const inquiryCategoryDeleteResponeDTO =
            new InquiryCategoryDeleteResponseDTO({
              responseTokenDTO,
              deleted,
            });

          resolve(inquiryCategoryDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
};

module.exports = inquiryCategoryDao;
