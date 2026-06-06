require("winston-daily-rotate-file");
const fs = require("fs");
const { createLogger, format, transports } = require("winston");
const envProvider = require("@provider/envProvider");

const loggerLevel = envProvider.common.loggerLevel;
const logDir = "./src/log";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: loggerLevel,
  // ⭐ [공통 포맷] 모든 transport(콘솔, 파일)가 이 타임스탬프 설정을 기본으로 공유합니다.
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
  ),
  transports: [
    // 1. 콘솔 출력 설정
    new transports.Console({
      level: loggerLevel,
      format: format.combine(
        format.colorize(),
        // 개별 포맷을 지정하되, 공통의 timestamp를 안전하게 이어받아 출력만 바꿉니다.
        format.printf(
          (info) => `${info.timestamp} [${info.level}] ${info.message}`,
        ),
      ),
    }),

    // 2. 일별 파일 저장 설정 (변수로 빼지 않고 인라인으로 작성)
    new transports.DailyRotateFile({
      level: loggerLevel,
      filename: `${logDir}/%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      format: format.combine(
        // 파일에는 굳이 컬러(colorize)가 들어가지 않도록 깔끔하게 텍스트 포맷만 지정합니다.
        format.printf(
          (info) => `${info.timestamp} [${info.level}] ${info.message}`,
        ),
      ),
    }),
  ],
});

module.exports = logger;
