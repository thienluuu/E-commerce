const db = require("../models/index");
const { v4: uuidv4 } = require("uuid");
const message = require("../models/message");

const createChatService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data.length < 2) {
        resolve({
          errCode: 1,
          message: "Missing parameters",
        });
      } else {
        let mems = data.toString();
        let chatId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        await db.Chat.findOrCreate({
          where: { members: mems },
          defaults: {
            chatId: chatId,
          },
        });
        resolve({
          errCode: 0,
          message: "Create chat successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getChatByUserIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameters",
        });
      } else {
        let chats = await db.Chat.findAll({
          raw: true,
        });

        if (chats && chats.length > 0) {
          chats = chats.map((chat) => {
            let mems = chat.members.split(",");
            chat.members = mems;
            return chat;
          });
          chats = chats.filter((chat) => chat.members.includes(data));
          if (chats && chats.length > 0) {
            resolve({
              errCode: 0,
              message: "Find chats successfully",
              data: chats,
            });
          }
        } else {
          resolve({
            errCode: 2,
            message: "Chats not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getMessagesByChatIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameters",
        });
      } else {
        let result = await db.Message.findAll({
          where: { chatId: data },
        });
        if (result && result.length > 0) {
          resolve({
            errCode: 0,
            message: "Find all chat messages successfully ",
            data: result,
          });
        } else {
          resolve({
            errCode: 2,
            message: "Chat message not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const postMessageByChatIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.chatId || !data.senderId || !data.content) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let result = await db.Message.create({
          chatId: data.chatId,
          senderId: data.senderId,
          content: data.content,
        });
        if (result) {
          resolve({
            errCode: 0,
            message: "Save message successfully",
          });
        } else {
          resolve({
            errCode: 2,
            message: "Save message failed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createChatService,
  getChatByUserIdService,
  getMessagesByChatIdService,
  postMessageByChatIdService,
};
