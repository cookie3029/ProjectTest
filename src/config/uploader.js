const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
require("dotenv").config();

console.log("체크 리전:", process.env.OCI_REGION);
console.log("체크 액세스키:", process.env.OCI_ACCESS_KEY_ID);
console.log("체크 버킷명:", process.env.OCI_BUCKET_NAME);

// 1. OCI Object Storage S3 호환 클라이언트 세팅
const s3 = new S3Client({
  region: process.env.OCI_REGION,
  credentials: {
    accessKeyId: process.env.OCI_ACCESS_KEY_ID,
    secretAccessKey: process.env.OCI_SECRET_ACCESS_KEY,
  },
  // 오라클 클라우드 전용 엔드포인트 URL
  endpoint: `https://${process.env.OCI_NAMESPACE}.compat.objectstorage.${process.env.OCI_REGION}.oraclecloud.com`,
  forcePathStyle: true,
});

// 2. Multer-S3 설정
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.OCI_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE, // 브라우저에서 바로 열리도록 타입 자동 지정
    key: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

      // 💡 라우터에서 지정한 req.uploadTarget 폴더 경로를 사용합니다.
      const folder = req.uploadTarget || "general";

      // 예: articles/17156293-982341.jpg 형태로 버킷에 저장됨
      cb(null, `${folder}/${uniqueSuffix}${extension}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 파일 1개당 최대 10MB 제한
});

module.exports = upload;
