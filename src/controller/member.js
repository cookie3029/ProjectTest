const superagent = require("superagent");

const logger = require("@lib/logger");

const memberService = require("@service/memberService");

const MemberCreateRequestDTO = require("@memberRequestDTO/memberCreateRequestDTO");
const MemberReadRequestDTO = require("@memberRequestDTO/memberReadRequestDTO");
const MemberUpdateRequestDTO = require("@memberRequestDTO/memberUpdateRequestDTO");
const MemberDeleteRequestDTO = require("@memberRequestDTO/memberDeleteRequestDTO");

const { handleValidationError } = require("@helper/mvcHelper");

exports.createMember = async (req, res) => {
  try {
    const requestDTO = new MemberCreateRequestDTO(req.body);

    const memberReadRequestDTO = new MemberReadRequestDTO({ ...req.body });

    const memberResponseDTO =
      await memberService.selectMember(memberReadRequestDTO);

    if (memberResponseDTO.id !== undefined) {
      throw new Error("이미 존재하는 멤버입니다.");
    }

    logger.info(`router/member.js.reg.params: ${JSON.stringify(requestDTO)}}`);

    handleValidationError(requestDTO);

    const responseDTO = await memberService.reg(requestDTO);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/member.js.reg.error: ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getMemberInfo = async (req, res) => {
  try {
    const requestDTO = new MemberReadRequestDTO(req.params);

    logger.info(`router/member.js.info.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await memberService.info(requestDTO);

    logger.info(`router/member.js.info.result: ${JSON.stringify(responseDTO)}`);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/member.js.info.error: ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getAllMemberInfo = async (req, res) => {
  try {
    const requestDTO = new MemberReadRequestDTO(req.params);

    logger.info(`router/member.js.info.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await memberService.getAllMemberInfo(requestDTO);

    logger.info(
      `router/member.js.getAllMemberInfo.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/member.js.getAllMemberInfo.error: ${err.message.toString()}`,
    );
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.modifyMember = async (req, res) => {
  try {
    const requestDTO = new MemberUpdateRequestDTO(req.body);

    logger.info(
      `router/member.js.update.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await memberService.update(req, requestDTO);

    logger.info(
      `router/member.js.update.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/member.js.update.error: ${err.message.toString()}`);

    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteMember = async (req, res) => {
  try {
    const requestDTO = new MemberDeleteRequestDTO(req.body);

    logger.info(
      `router/member.js.delete.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await memberService.delete(req, requestDTO);

    logger.info(
      `router/member.js.delete.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteMemberForce = async (req, res) => {
  try {
    const requestDTO = new MemberDeleteRequestDTO(req.body);

    logger.info(
      `router/member.js.delete.params) ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await memberService.deleteForce(req, requestDTO);

    logger.info(
      `router/member.js.delete.result ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.imageUpload = async (req, res) => {
  try {
    const { articleId } = req.params;

    // 다수 파일 업로드는 req.file이 아니라 [req.files] 배열로 들어옵니다!
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "업로드된 파일이 없습니다." });
    }

    // 💡 req.files 배열을 돌면서 오라클 클라우드가 준 URL(location)들을 쏙쏙 뽑아냅니다.
    const imageRecords = req.files.map((file) => {
      return {
        articleId: articleId,
        imageUrl: file.location, // 🔥 오라클 클라우드가 새로 생성해 준 전체 URL 주소!
      };
    });

    // Sequelize의 bulkCreate로 레코드들을 배열째로 한 번에 DB에 대량 Insert 합니다.
    const savedImages = await ArticleImage.bulkCreate(imageRecords);

    return res.status(201).json({
      success: true,
      message: `${savedImages.length}개의 이미지가 성공적으로 업로드 및 DB에 저장되었습니다.`,
      data: savedImages,
    });
  } catch (error) {
    console.error("다중 업로드 에러:", error);
    return res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
};
