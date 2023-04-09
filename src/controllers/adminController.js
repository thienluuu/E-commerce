const {
  getAllCodeByIdService,
  createNewCategoryService,
  createNewProductService,
  getAllCategoryService,
  editCategoryByIdService,
  deleteCategoryByIdService,
  getUserByIdService,
  getProductByIdService,
  getProductRelatedService,
  getProductByCategoryService,
  editUserService,
  deleteUserService,
  editProductByIdService,
  deleteProductByIdService,
  getAllOrderByStaTusService,
  confirmNewOrderService,
  insertCodeService,
} = require("../services/adminService");

const serverOn = (req, res) => {
  return res.render("admin.ejs", {
    data: "server on ....",
  });
};
const insertCode = async (req, res) => {
  try {
    const response = await insertCodeService();
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
//allcode
const getAllCodeById = async (req, res) => {
  try {
    const response = await getAllCodeByIdService(req.query.id);
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
//user
const getUserById = async (req, res) => {
  try {
    console.log(req.query.id);
    const response = await getUserByIdService(req.query.id);
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
const editUserById = async (req, res) => {
  try {
    const response = await editUserService(req.body);
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
const deleteUserById = async (req, res) => {
  try {
    const response = await deleteUserService(req.query.id);
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
//product
const createNewProduct = async (req, res) => {
  try {
    const response = await createNewProductService(req.body);
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
const getProductById = async (req, res) => {
  try {
    const response = await getProductByIdService(req.query.id);
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
const editProductById = async (req, res) => {
  try {
    const response = await editProductByIdService(req.body);
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
const deleteProductById = async (req, res) => {
  try {
    const response = await deleteProductByIdService(req.query.id);
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
const getProductRelated = async (req, res) => {
  try {
    const response = await getProductRelatedService(
      req.query.id,
      req.query.productType
    );
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

//category
const createNewCategory = async (req, res) => {
  try {
    const response = await createNewCategoryService(req.body);
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

const getAllCategory = async (req, res) => {
  try {
    const response = await getAllCategoryService();
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

const editCategoryById = async (req, res) => {
  try {
    const response = await editCategoryByIdService(req.body);
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
const deleteCategoryById = async (req, res) => {
  try {
    const response = await deleteCategoryByIdService(req.query.id);
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
const getProductByCategory = async (req, res) => {
  try {
    const response = await getProductByCategoryService(req.query.id);
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

//order
const getAllOrderByStaTus = async (req, res) => {
  try {
    const response = await getAllOrderByStaTusService(req.query.id);
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
const confirmNewOrder = async (req, res) => {
  try {
    const response = await confirmNewOrderService(req.query.id);
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
deleteCategoryById;
module.exports = {
  createNewCategory,
  createNewProduct,
  getUserById,
  getAllCategory,
  getProductById,
  getProductRelated,
  getProductByCategory,
  editUserById,
  deleteUserById,
  editProductById,
  deleteProductById,
  getAllCodeById,
  editCategoryById,
  deleteCategoryById,
  getAllOrderByStaTus,
  confirmNewOrder,
  insertCode,
  serverOn,
};
