const {
  Admin,
  InquiryCategory,
  ArticleCategory,
  Article,
} = require("@models/index");

// CRUD
const AdminCreateResponseDTO = require("@adminResponseDTO/adminCreateResponseDTO");
const AdminReadResponseDTO = require("@adminResponseDTO/adminReadResponseDTO");
const AdminUpdateResponseDTO = require("@adminResponseDTO/adminUpdateResponseDTO");
const AdminReadNameListResponseDTO = require("@adminResponseDTO/AdminReadNameListResponseDTO");
const AdminListResponseDTO = require("@adminResponseDTO/adminListResponseDTO");

const adminDao = {
  insert: async (requestDTO) =>
    new Promise((resolve, reject) => {
      Admin.create(requestDTO)
        .then((inserted) => {
          const { password, ...newInserted } = JSON.parse(
            JSON.stringify(inserted),
          );
          const adminCreateResponseDTO = new AdminCreateResponseDTO(
            newInserted,
          );

          resolve(adminCreateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectInfo: async (requestDTO) =>
    new Promise((resolve, reject) => {
      Admin.findByPk(requestDTO.id, {
        attributes: { exclude: ["password"] },
        include: [
          {
            model: InquiryCategory,
            as: "InquiryCategories",
            attributes: InquiryCategory.getIncludeAttributes(),
          },
          {
            model: ArticleCategory,
            as: "ArticleCategories",
            attributes: ArticleCategory.getIncludeAttributes(),
          },
          {
            model: Article,
            as: "Articles",
            attributes: Article.getIncludeAttributes(),
          },
        ],
      })
        .then((selectedInfo) => {
          console.log(JSON.stringify(selectedInfo));
          const adminReadResponseDTO = new AdminReadResponseDTO(selectedInfo);

          resolve(adminReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectInfosByNames: (requestDTO) => {
    const setQuery = {};

    setQuery.where = {
      ...setQuery.where,
      name: { [Op.iLike]: `%${requestDTO.name}%` },
    };

    return new Promise((resolve, reject) => {
      Admin.findAll({
        ...setQuery,
        attributes: ["id"],
      })
        .then((selectedInfo) => {
          const idArray = selectedInfo.map((admin) => admin.id);

          const adminReadNameListResponseDTO = new AdminReadNameListResponseDTO(
            {
              ids: idArray,
            },
          );

          resolve(adminReadNameListResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  selectAdmin: async (requestDTO) =>
    new Promise((resolve, reject) => {
      Admin.findOne({
        where: [{ email: requestDTO.email }],
      })
        .then((selectedInfo) => {
          const adminReadResponseDTO = new AdminReadResponseDTO(selectedInfo);

          resolve(adminReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  getAllAdminInfo: async () =>
    new Promise((resolve, reject) => {
      Admin.findAll({
        attributes: { exclude: ["password"] },
        include: [
          {
            model: InquiryCategory,
            as: "InquiryCategories",
            attributes: InquiryCategory.getIncludeAttributes(),
          },
          {
            model: ArticleCategory,
            as: "ArticleCategories",
            attributes: ArticleCategory.getIncludeAttributes(),
          },
          {
            model: Article,
            as: "Articles",
            attributes: Article.getIncludeAttributes(),
          },
        ],
      })
        .then((selectedInfos) => {
          const adminListResponseDTO = new AdminListResponseDTO(selectedInfos);

          console.log(adminListResponseDTO.adminList);

          resolve(adminListResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  update: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Admin.update(requestDTO, {
        where: { id: requestDTO.id },
      })
        .then(([updated]) => {
          const adminUpdateResponseDTO = new AdminUpdateResponseDTO({
            ...responseTokenDTO,
            updated,
          });

          resolve(adminUpdateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
};

module.exports = adminDao;
