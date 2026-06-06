const { Member, MemberImage } = require("@models/index");

// CRUD
const MemberCreateResponseDTO = require("@memberResponseDTO/memberCreateResponseDTO");
const MemberReadResponseDTO = require("@memberResponseDTO/memberReadResponseDTO");
const MemberUpdateResponseDTO = require("@memberResponseDTO/memberUpdateResponseDTO");
const MemberDeleteResponseDTO = require("@memberResponseDTO/memberDeleteResponseDTO");
const MemberListResponseDTO = require("@memberResponseDTO/memberListResponseDTO");

const memberDao = {
  insert: async (requestDTO) =>
    new Promise((resolve, reject) => {
      Member.create(requestDTO)
        .then((inserted) => {
          const newInserted = JSON.parse(JSON.stringify(inserted));
          const memberCreateResponseDTO = new MemberCreateResponseDTO(
            newInserted,
          );

          resolve(memberCreateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectInfo: async (requestDTO) =>
    new Promise((resolve, reject) => {
      Member.findByPk(requestDTO.id, {
        include: [
          {
            model: MemberImage,
            as: "MemberImages",
            attributes: MemberImage.getIncludeAttributes(),
          },
        ],
      })
        .then((selectInfo) => {
          const memberReadResponseDTO = new MemberReadResponseDTO(selectInfo);

          resolve(memberReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectMember: async (requestDTO) =>
    new Promise((resolve, reject) => {
      Member.findOne({
        where: [{ name: requestDTO.name }],
      })
        .then((selectedInfo) => {
          const memberReadResponseDTO = new MemberReadResponseDTO(selectedInfo);

          resolve(memberReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  getAllMemberInfo: async () =>
    new Promise((resolve, reject) => {
      Member.findAll({
        include: [
          {
            model: MemberImage,
            as: "MemberImages",
            attributes: MemberImage.getIncludeAttributes(),
          },
        ],
      })
        .then((selectedInfos) => {
          const memberListResponseDTO = new MemberListResponseDTO(
            selectedInfos,
          );

          console.log(memberListResponseDTO.memberList);

          resolve(memberListResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  update: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Member.update(requestDTO, {
        where: { id: requestDTO.id },
      })
        .then(([updated]) => {
          const memberUpdateResponseDTO = new MemberUpdateResponseDTO({
            ...responseTokenDTO,
            updated,
          });

          resolve(memberUpdateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  delete: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Member.destroy({
        where: { id: requestDTO.id },
      })
        .then((deleted) => {
          const memberDeleteResponeDTO = new MemberDeleteResponseDTO({
            responseTokenDTO,
            deleted,
          });

          resolve(memberDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  deleteForce: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Member.destroy({
        where: { id: requestDTO.id },
        force: true,
      })
        .then((deleted) => {
          const memberDeleteResponeDTO = new MemberDeleteResponseDTO({
            responseTokenDTO,
            deleted,
          });

          resolve(memberDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
};

module.exports = memberDao;
