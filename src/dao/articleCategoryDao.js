const { Article, ArticleCategory, Admin } = require("@models/index");

// CRUD
const ArticleCreateResponseDTO = require("@articleCategoryResponseDTO/articleCategoryCreateResponseDTO");
const ArticleReadResponseDTO = require("@articleCategoryResponseDTO/articleCategoryReadResponseDTO");
const ArticleUpdateResponseDTO = require("@articleCategoryResponseDTO/articleCategoryUpdateResponseDTO");
const ArticleDeleteResponseDTO = require("@articleCategoryResponseDTO/articleCategoryDeleteResponseDTO");
const ArticleListResponseDTO = require("@articleCategoryResponseDTO/articleCategoryListResponseDTO");

const articleCategoryDao = {
  insert: async (requestDTO) =>
    new Promise((resolve, reject) => {
      ArticleCategory.create(requestDTO)
        .then((inserted) => {
          const newInserted = JSON.parse(JSON.stringify(inserted));
          const articleCategoryCreateResponseDTO = new ArticleCreateResponseDTO(
            newInserted,
          );

          resolve(articleCategoryCreateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectInfo: async (requestDTO) =>
    new Promise((resolve, reject) => {
      ArticleCategory.findByPk(requestDTO.id, {
        include: [
          {
            model: Article,
            as: "Articles",
            attributes: Article.getIncludeAttributes(),
          },
          {
            model: Admin,
            as: "Admin",
            attributes: Admin.getIncludeAttributes(),
          },
        ],
      })
        .then((selectInfo) => {
          const articleCategoryReadResponseDTO = new ArticleReadResponseDTO(
            selectInfo,
          );

          resolve(articleCategoryReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  selectArticleCategory: async (requestDTO) =>
    new Promise((resolve, reject) => {
      ArticleCategory.findOne({
        where: [{ id: requestDTO.id }],
      })
        .then((selectedInfo) => {
          const articleCategoryReadResponseDTO = new ArticleReadResponseDTO(
            selectedInfo,
          );

          resolve(articleCategoryReadResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  getAllAritcleCategoryInfo: async () =>
    new Promise((resolve, reject) => {
      ArticleCategory.findAll({
        include: [
          {
            model: Article,
            as: "Articles",
            attributes: Article.getIncludeAttributes(),
          },
          {
            model: Admin,
            as: "Admin",
            attributes: Admin.getIncludeAttributes(),
          },
        ],
      })
        .then((selectedInfos) => {
          const articleCategoryListResponseDTO = new ArticleListResponseDTO(
            selectedInfos,
          );

          console.log(articleCategoryListResponseDTO.articleCategoryList);

          resolve(articleCategoryListResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  update: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      ArticleCategory.update(requestDTO, {
        where: { id: requestDTO.id },
      })
        .then(([updated]) => {
          const articleCategoryUpdateResponseDTO = new ArticleUpdateResponseDTO(
            {
              ...responseTokenDTO,
              updated,
            },
          );

          resolve(articleCategoryUpdateResponseDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  delete: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      ArticleCategory.destroy({
        where: { id: requestDTO.id },
      })
        .then((deleted) => {
          const articleCategoryDeleteResponeDTO = new ArticleDeleteResponseDTO({
            responseTokenDTO,
            deleted,
          });

          resolve(articleCategoryDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  deleteForce: (responseTokenDTO, requestDTO) =>
    new Promise((resolve, reject) => {
      ArticleCategory.destroy({
        where: { id: requestDTO.id },
        force: true,
      })
        .then((deleted) => {
          const articleCategoryDeleteResponeDTO = new ArticleDeleteResponseDTO({
            responseTokenDTO,
            deleted,
          });

          resolve(articleCategoryDeleteResponeDTO);
        })
        .catch((err) => {
          reject(err);
        });
    }),
};

module.exports = articleCategoryDao;
