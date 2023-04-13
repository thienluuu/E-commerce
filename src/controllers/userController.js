const {
  createNewUserService,
  loginService,
  createNewOrderService,
  searchProductService,
  confirmOderShippedService,
  getAllOrderByUserIdService,
  deleteNewOrderService,
  getUserDataService,
} = require("../services/userService");
const createNewUser = async (req, res) => {
  try {
    const response = await createNewUserService(req.body);
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
const login = async (req, res) => {
  try {
    const response = await loginService(req.body);
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
const createNewOrder = async (req, res) => {
  console.log(req.body);
  try {
    const response = await createNewOrderService(req.body);
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
const getAllOrderByUserId = async (req, res) => {
  try {
    const response = await getAllOrderByUserIdService(
      req.query.id,
      req.query.statusId
    );
    return res.status(200).json({
      errCode: response.errCode,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.log(error);1
    return res.status(500).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
const searchProduct = async (req, res) => {
  try {
    const response = await searchProductService(req.query.id);
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
const confirmOderShipped = async (req, res) => {
  try {
    const response = await confirmOderShippedService(req.query.id);
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
const deleteNewOrder = async (req, res) => {
  try {
    const response = await deleteNewOrderService(req.query.id);
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
const getUserData = async (req, res) => {
  try {
    const response = await getUserDataService(req.query.id);
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
module.exports = {
  createNewUser,
  login,
  createNewOrder,
  getAllOrderByUserId,
  searchProduct,
  confirmOderShipped,
  deleteNewOrder,
  getUserData,
};
