const express = require("express");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");
const chatController = require("../controllers/chatController");
const router = express.Router();
const initWebRoutes = (app) => {
  //User
  router.post("/api/create-new-user", userController.createNewUser);
  router.post("/api/login", userController.login);
  router.get(
    "/api/get-product-by-category",
    adminController.getProductByCategory
  );
  router.post("/api/create-new-order", userController.createNewOrder);
  router.get("/api/search-product", userController.searchProduct);
  router.get(
    "/api/get-all-order-by-user-id",
    userController.getAllOrderByUserId
  );
  router.post("/api/confirm-order-shipped", userController.confirmOderShipped);
  router.delete("/api/delete-new-order", userController.deleteNewOrder);
  router.get("/api/get-user-data", userController.getUserData);

  //Admin
  router.get("/api/get-all-code-by-id", adminController.getAllCodeById);
  router.post("api/insert-code", adminController.insertCode);
  router.get("/api/get-user-by-id", adminController.getUserById);
  router.put("/api/edit-user-by-id", adminController.editUserById);
  router.delete("/api/delete-user-by-id", adminController.deleteUserById);

  router.post("/api/create-new-product", adminController.createNewProduct);
  router.get("/api/get-product-by-id", adminController.getProductById);
  router.put("/api/edit-product-by-id", adminController.editProductById);
  router.delete("/api/delete-product-by-id", adminController.deleteProductById);
  router.get("/api/get-product-related", adminController.getProductRelated);

  router.post("/api/create-new-category", adminController.createNewCategory);
  router.get("/api/get-all-category", adminController.getAllCategory);
  router.put("/api/edit-category-by-id", adminController.editCategoryById);
  router.delete(
    "/api/delete-category-by-id",
    adminController.deleteCategoryById
  );

  router.get(
    "/api/get-all-order-by-status",
    adminController.getAllOrderByStaTus
  );
  router.post("/api/confirm-new-order", adminController.confirmNewOrder);

  //Chat
  router.post("/api/post-chat", chatController.createChat);
  router.get("/api/get-chat", chatController.getChatByUserId);
  router.post("/api/post-message", chatController.postMessageByChatId);
  router.get("/api/get-message", chatController.getMessagesByChatId);

  return app.use("/", router);
};
module.exports = initWebRoutes;
