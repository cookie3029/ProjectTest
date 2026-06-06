const { Inquiry, Visitor } = require("@models/index");

// CRUD
const VisitorCreateResponseDTO = require("@visitorResponseDTO/visitorCreateResponseDTO");
const VisitorReadResponseDTO = require("@visitorResponseDTO/visitorReadResponseDTO");
const VisitorUpdateResponseDTO = require("@visitorResponseDTO/visitorUpdateResponseDTO");
const VisitorDeleteResponseDTO = require("@visitorResponseDTO/visitorDeleteResponseDTO");
const VisitorListResponseDTO = require("@visitorResponseDTO/visitorListResponseDTO");

const visitorDao = {
  insert: async (requestDTO) =>
    new Promise((resolve, reject) => {
      Visitor.create(requestDTO)
        .then((inserted) => {
          const newInserted = JSON.parse(JSON.stringify(inserted));
          const visitorCreateResponseDTO = new VisitorCreateResponseDTO(
            newInserted,
          );

          resolve(visitorCreateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectInfo: async (requestDTO) =>
    new Promise((resolve, reject) => {
      Visitor.findByPk(requestDTO.id, {
        include: [
          {
            model: Inquiry,
            as: "Inquirys",
            attributes: Inquiry.getIncludeAttributes(),
          },
        ],
      })
        .then((selectInfo) => {
          const visitorReadResponseDTO = new VisitorReadResponseDTO(selectInfo);

          resolve(visitorReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectVisitor: async (requestDTO) =>
    new Promise((resolve, reject) => {
      Visitor.findOne({
        where: [{ id: requestDTO.id }],
      })
        .then((selectedInfo) => {
          const visitorReadResponseDTO = new VisitorReadResponseDTO(
            selectedInfo,
          );

          resolve(visitorReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  getAllVisitorInfo: async () =>
    new Promise((resolve, reject) => {
      Visitor.findAll({
        include: [
          {
            model: Inquiry,
            as: "Inquirys",
            attributes: Inquiry.getIncludeAttributes(),
          },
        ],
      })
        .then((selectedInfos) => {
          const visitorListResponseDTO = new VisitorListResponseDTO(
            selectedInfos,
          );

          console.log(visitorListResponseDTO.visitorList);

          resolve(visitorListResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  update: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Visitor.update(requestDTO, {
        where: { id: requestDTO.id },
      })
        .then(([updated]) => {
          const visitorUpdateResponseDTO = new VisitorUpdateResponseDTO({
            ...responseTokenDTO,
            updated,
          });

          resolve(visitorUpdateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  delete: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Visitor.destroy({
        where: { id: requestDTO.id },
      })
        .then((deleted) => {
          const visitorDeleteResponeDTO = new VisitorDeleteResponseDTO({
            responseTokenDTO,
            deleted,
          });

          resolve(visitorDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  deleteForce: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Visitor.destroy({
        where: { id: requestDTO.id },
        force: true,
      })
        .then((deleted) => {
          const visitorDeleteResponeDTO = new VisitorDeleteResponseDTO({
            responseTokenDTO,
            deleted,
          });

          resolve(visitorDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
};

module.exports = visitorDao;
