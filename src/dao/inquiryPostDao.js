const { InquiryCategory, InquiryPost, Visitor } = require("@models/index");

// CRUD
const InquiryPostCreateResponseDTO = require("@inquiryPostResponseDTO/inquiryPostCreateResponseDTO");
const InquiryPostReadResponseDTO = require("@inquiryPostResponseDTO/inquiryPostReadResponseDTO");
const InquiryPostUpdateResponseDTO = require("@inquiryPostResponseDTO/inquiryPostUpdateResponseDTO");
const InquiryPostDeleteResponseDTO = require("@inquiryPostResponseDTO/inquiryPostDeleteResponseDTO");
const InquiryPostListResponseDTO = require("@inquiryPostResponseDTO/inquiryPostListResponseDTO");

const inquiryPostDao = {
  insert: async (requestDTO) =>
    new Promise((resolve, reject) => {
      InquiryPost.create(requestDTO)
        .then((inserted) => {
          const newInserted = JSON.parse(JSON.stringify(inserted));
          const inquiryPostCreateResponseDTO = new InquiryPostCreateResponseDTO(
            newInserted,
          );

          resolve(inquiryPostCreateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectInfo: async (requestDTO) =>
    new Promise((resolve, reject) => {
      InquiryPost.findByPk(requestDTO.id, {
        include: [
          {
            model: InquiryCategory,
            as: "InquiryCategory",
            attributes: InquiryCategory.getIncludeAttributes(),
          },
          {
            model: Visitor,
            as: "Visitor",
            attributes: Visitor.getIncludeAttributes(),
          },
        ],
      })
        .then((selectInfo) => {
          const inquiryPostReadResponseDTO = new InquiryPostReadResponseDTO(
            selectInfo,
          );

          resolve(inquiryPostReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectInquiryPost: async (requestDTO) =>
    new Promise((resolve, reject) => {
      InquiryPost.findOne({
        where: [{ id: requestDTO.id }],
      })
        .then((selectedInfo) => {
          const inquiryPostReadResponseDTO = new InquiryPostReadResponseDTO(
            selectedInfo,
          );

          resolve(inquiryPostReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  getAllInquiryPostInfo: async () =>
    new Promise((resolve, reject) => {
      InquiryPost.findAll({
        include: [
          {
            model: InquiryCategory,
            as: "InquiryCategory",
            attributes: InquiryCategory.getIncludeAttributes(),
          },
          {
            model: Visitor,
            as: "Visitor",
            attributes: Visitor.getIncludeAttributes(),
          },
        ],
      })
        .then((selectedInfos) => {
          const inquiryPostListResponseDTO = new InquiryPostListResponseDTO(
            selectedInfos,
          );

          console.log(inquiryPostListResponseDTO.inquiryPostList);

          resolve(inquiryPostListResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  delete: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      InquiryPost.destroy({
        where: { id: requestDTO.id },
      })
        .then((deleted) => {
          const inquiryPostDeleteResponeDTO = new InquiryPostDeleteResponseDTO({
            responseTokenDTO,
            deleted,
          });

          resolve(inquiryPostDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  deleteForce: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      InquiryPost.destroy({
        where: { id: requestDTO.id },
        force: true,
      })
        .then((deleted) => {
          const inquiryPostDeleteResponeDTO = new InquiryPostDeleteResponseDTO({
            responseTokenDTO,
            deleted,
          });

          resolve(inquiryPostDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
};

module.exports = inquiryPostDao;
