const db = require("../models/index");

const adminData = {
  userName: "Administrator",
  password: "$2b$10$ckriGESErGbJCzjSxayGXukDBtcGVxy7blN1P3/GP4JIPrLio1WGe",
  roleId: "R1",
  token: "176eae0e-03f7-4133-a3da-5daf5c7ca474",
  email: "thienm199x@gmail.com",
};
const allCodeData = [
  {
    keyMap: "R1",
    type: "ROLE",
    value: "Admin",
  },
  {
    keyMap: "R2",
    type: "ROLE",
    value: "User",
  },
  {
    keyMap: "S1",
    type: "STATUS",
    value: "New Order",
  },
  {
    keyMap: "S2",
    type: "STATUS",
    value: "Shipping",
  },
  {
    keyMap: "F",
    type: "GENDER",
    value: "Female",
  },
  {
    keyMap: "M",
    type: "GENDER",
    value: "Male",
  },
];
const insertCodeService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create({
        userName: adminData.userName,
        password: adminData.password,
        roleId: adminData.roleId,
        token: adminData.token,
        email: adminData.email,
      });
      await db.AllCode.bulkCreate(allCodeData);
      resolve({
        errCode: 0,
        message: "Admin oke",
      });
    } catch (error) {
      reject(error);
    }
  });
};

//all code
const getAllCodeByIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: -1,
          message: "Missing parameter",
        });
      } else {
        let allCode = await db.AllCode.findAll({
          where: { type: data },
          attributes: ["value", "keyMap"],
        });
        if (allCode) {
          resolve({
            errCode: 0,
            message: `Find  ${data}  successfully`,
            data: allCode,
          });
        } else {
          resolve({
            errCode: 0,
            message: "AllCode not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
//user
const getUserByIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: -1,
          message: "Missing parameter",
        });
      } else {
        let allUser;
        if (data === "ALL") {
          allUser = await db.User.findAll({
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.AllCode,
                as: "genderData",
                attributes: ["value"],
              },
            ],
            raw: false,
          });
          allUser = allUser.map((user) => {
            let image = new Buffer(user.image, "base64").toString("binary");
            user.image = image;
            return user;
          });
        } else {
          allUser = await db.User.findOne({
            where: { id: data },
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.AllCode,
                as: "genderData",
                attributes: ["value"],
              },
            ],
            raw: false,
          });
          allUser = allUser.map((user) => {
            let image = new Buffer(user.image, "base64").toString("binary");
            user.image = image;
            return user;
          });
        }
        if (allUser) {
          resolve({
            errCode: 0,
            message: "Find all users successfully",
            data: allUser,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const editUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Object.values(data).length <= 0) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let res = await db.User.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (res) {
          res.userName = data.userName;
          res.fullName = data.fullName;
          res.email = data.email;
          res.phoneNumber = data.phoneNumber;
          res.address = data.address;
          res.image = data.avatar;
          res.gender = data.gender;
          res.roleId = data.roleId;
          await res.save();
          resolve({
            errCode: 0,
            message: "Updated user successfully",
          });
        } else {
          resolve({
            errCode: 2,
            message: "User not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let res = await db.User.findOne({
          where: { id: data },
        });
        if (res) {
          await res.destroy();
          resolve({
            errCode: 0,
            message: "Delete user successfully",
          });
        } else {
          resolve({
            errCode: 2,
            message: "User not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

//product
const getProductByIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let products = "";
        if (data === "ALL") {
          products = await db.Product.findAll({
            include: [
              {
                model: db.Category,
                as: "categoryData",
                attributes: ["name"],
              },
            ],
            raw: false,
          });
          products = products.map((product) => {
            let image = new Buffer(product.image, "base64").toString("binary");
            product.image = image;
            return product;
          });
        } else if (data && data !== "ALL") {
          products = await db.Product.findOne({
            where: { id: data },
            include: [
              {
                model: db.Category,
                as: "categoryData",
                attributes: ["name"],
              },
            ],
            raw: false,
          });
          let image = new Buffer(products.image, "base64").toString("binary");
          products.image = image;
        }
        if (products) {
          resolve({
            errCode: 0,
            message: "Find all products or product successfully",
            data: products,
          });
        } else {
          resolve({
            errCode: 2,
            message: "Product not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const createNewProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Object.values(data).length < 0) {
        resolve({
          errCode: -1,
          message: "Missing parameter",
        });
      } else {
        await db.Product.create({
          productName: data.productName,
          productType: data.productType,
          image: data.image,
          quantity: data.quantity,
          description: data.description,
          price: data.price,
        });
        resolve({
          errCode: 0,
          message: "Create product successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const editProductByIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Object.values(data).length <= 0) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let res = await db.Product.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (res) {
          res.productName = data.productName;
          res.productType = data.productType;
          res.quantity = data.quantity;
          res.price = data.price;
          res.description = data.description;
          res.image = data.image;
          await res.save();
          resolve({
            errCode: 0,
            message: "Updated product successfully",
          });
        } else {
          resolve({
            errCode: 2,
            message: "Product not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteProductByIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let res = await db.Product.findOne({
          where: { id: data },
        });
        if (res) {
          await res.destroy();
          resolve({
            errCode: 0,
            message: "Deleted product successfully",
          });
        } else {
          resolve({
            errCode: 2,
            message: "Product not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getProductRelatedService = (id, productType) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !productType) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let products = await db.Product.findAll({
          where: { productType: productType },
          raw: false,
          include: [
            {
              model: db.Category,
              as: "categoryData",
              attributes: ["name"],
            },
          ],
        });
        if (products && products.length > 0) {
          products = products.filter((item) => item.id !== +id);
          products = products.map((product) => {
            let image = new Buffer(product.image, "base64").toString("binary");
            product.image = image;
            return product;
          });
          resolve({
            errCode: 0,
            message: "Find products related to product successfully",
            data: products,
          });
        } else {
          resolve({
            errCode: 2,
            message: "Product not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getProductByCategoryService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let products = await db.Product.findAll({
          where: { productType: data },
          raw: false,
        });
        products = products.map((product) => {
          let image = new Buffer(product.image, "base64").toString("binary");
          product.image = image;
          return product;
        });
        if (products && products.length > 0) {
          resolve({
            errCode: 0,
            message: "Find products by category successfully",
            data: products,
          });
        } else {
          resolve({
            errCode: 2,
            message: "Product not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

//category
const createNewCategoryService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Object.values(data).length < 0) {
        resolve({
          errCode: -1,
          message: "Missing parameter",
        });
      } else {
        await db.Category.create({
          name: data.name,
          productType: data.productType,
          image: data.image,
        });
        resolve({
          errCode: 0,
          message: "Create category successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllCategoryService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = "";
      categories = await db.Category.findAll({
        raw: false,
      });
      categories = categories.map((category) => {
        let image = new Buffer(category.image, "base64").toString("binary");
        category.image = image;
        return category;
      });
      if (categories) {
        resolve({
          errCode: 0,
          message: "Get all category  successfully",
          data: categories,
        });
      } else {
        resolve({
          errCode: 2,
          message: "Category not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const editCategoryByIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Object.values(data).length <= 0) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let res = await db.Category.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (res) {
          res.name = data.name;
          res.productType = data.productType;
          res.image = data.image;
          await res.save();
          resolve({
            errCode: 0,
            message: "Updated category successfully",
          });
        } else {
          resolve({
            errCode: 2,
            message: "Category not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteCategoryByIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let res = await db.Category.findOne({
          where: { id: data },
        });
        if (res) {
          await res.destroy();
          resolve({
            errCode: 0,
            message: "Deleted category successfully",
          });
        } else {
          resolve({
            errCode: 2,
            message: "Category not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

//order
const getAllOrderByStaTusService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let res = await db.Order.findAll({
          where: { statusId: data },
        });
        if (res) {
          resolve({
            errCode: 0,
            message: "Find orders successfully",
            data: res,
          });
        } else {
          resolve({
            errCode: 2,
            message: "Orders not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const confirmNewOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameter",
        });
      } else {
        let res = await db.Order.findOne({
          where: { id: data },
        });
        if (res) {
          res.statusId = "S2";
          await res.save();
          resolve({
            errCode: 0,
            message: "Confirm order successfully",
            data: res,
          });
        } else {
          resolve({
            errCode: 2,
            message: "Order not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewCategoryService,
  getAllCategoryService,
  getProductByIdService,
  editCategoryByIdService,
  deleteCategoryByIdService,
  getProductByCategoryService,
  getProductRelatedService,
  getUserByIdService,
  editUserService,
  deleteUserService,
  createNewProductService,
  editProductByIdService,
  deleteProductByIdService,
  getAllCodeByIdService,
  getAllOrderByStaTusService,
  confirmNewOrderService,
  insertCodeService,
};
