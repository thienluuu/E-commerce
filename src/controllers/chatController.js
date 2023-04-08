const {
  createChatService,
  getChatByUserIdService,
  getMessagesByChatIdService,
  postMessageByChatIdService,
} = require("../services/chatService");

const createChat = async (req, res) => {
  try {
    const data = req.body;
    const response = await createChatService(data.members);
    return res.status(200).json({
      errCode: response.errCode,
      message: response.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
const getChatByUserId = async (req, res) => {
  try {
    const response = await getChatByUserIdService(req.query.id);
    return res.status(200).json({
      errCode: response.errCode,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const getMessagesByChatId = async (req, res) => {
  try {
    const response = await getMessagesByChatIdService(req.query.id);
    return res.status(200).json({
      errCode: response.errCode,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
const postMessageByChatId = async (req, res) => {
  try {
    const response = await postMessageByChatIdService(req.body);
    return res.status(200).json({
      errCode: response.errCode,
      message: response.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};  

module.exports = {
  createChat,
  getChatByUserId,
  getMessagesByChatId,
  postMessageByChatId,
};
