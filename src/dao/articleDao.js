const { Article, Admin, ArticleCategory } = require("@models/index");

// CRUD
const ArticleCreateResponseDTO = require("@articleResponseDTO/articleCreateResponseDTO");
const ArticleReadResponseDTO = require("@articleResponseDTO/articleReadResponseDTO");
const ArticleUpdateResponseDTO = require("@articleResponseDTO/articleUpdateResponseDTO");
const ArticleDeleteResponseDTO = require("@articleResponseDTO/articleDeleteResponseDTO");
const ArticleListResponseDTO = require("@articleResponseDTO/articleListResponseDTO");

const articleDao = {
  insert: async (requestDTO) =>
    new Promise((resolve, reject) => {
      Article.create(requestDTO)
        .then((inserted) => {
          const newInserted = JSON.parse(JSON.stringify(inserted));
          const articleCreateResponseDTO = new ArticleCreateResponseDTO(
            newInserted,
          );

          resolve(articleCreateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectInfo: async (requestDTO) =>
    new Promise((resolve, reject) => {
      Article.findByPk(requestDTO.id, {
        include: [
          {
            model: Admin,
            as: "Admin",
            attributes: Admin.getIncludeAttributes(),
          },
          {
            model: ArticleCategory,
            as: "ArticleCategory",
            attributes: ArticleCategory.getIncludeAttributes(),
          },
        ],
      })
        .then((selectInfo) => {
          const articleReadResponseDTO = new ArticleReadResponseDTO(selectInfo);

          resolve(articleReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectArticle: async (requestDTO) =>
    new Promise((resolve, reject) => {
      Article.findOne({
        where: [{ id: requestDTO.id }],
      })
        .then((selectedInfo) => {
          const articleReadResponseDTO = new ArticleReadResponseDTO(
            selectedInfo,
          );

          resolve(articleReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  getAllAritcleInfo: async () =>
    new Promise((resolve, reject) => {
      Article.findAll({
        include: [
          {
            model: Admin,
            as: "Admin",
            attributes: Admin.getIncludeAttributes(),
          },
          {
            model: ArticleCategory,
            as: "ArticleCategory",
            attributes: ArticleCategory.getIncludeAttributes(),
          },
        ],
      })
        .then((selectedInfos) => {
          const articleListResponseDTO = new ArticleListResponseDTO(
            selectedInfos,
          );

          console.log(articleListResponseDTO.articleList);

          resolve(articleListResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  delete: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Article.destroy({
        where: { id: requestDTO.id },
      })
        .then((deleted) => {
          const articleDeleteResponeDTO = new ArticleDeleteResponseDTO({
            responseTokenDTO,
            deleted,
          });

          resolve(articleDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  deleteForce: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      Article.destroy({
        where: { id: requestDTO.id },
        force: true,
      })
        .then((deleted) => {
          const articleDeleteResponeDTO = new ArticleDeleteResponseDTO({
            responseTokenDTO,
            deleted,
          });

          resolve(articleDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
};

module.exports = articleDao;
