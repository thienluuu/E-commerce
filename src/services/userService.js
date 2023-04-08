const db = require("../models/index");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const { v4: uuidv4 } = require("uuid");

// Validate data
const checkData = (data) => {
  const arrInput = [
    "userName",
    "password",
    "email",
    "fullName",
    "phoneNumber",
    "address",
    "gender",
    "avatar",
  ];
  let isValid = true;
  let inputData = "";
  for (let i = 0; i < arrInput.length; i++) {
    if (!data[arrInput[i]]) {
      isValid = false;
      inputData = arrInput[i];
      break;
    }
  }
  return {
    isValid,
    inputData,
  };
};
// HashedPassword
const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
//Create new account
const createNewUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkResult = checkData(data);
      if (checkResult.isValid === false) {
        resolve({
          errCode: 1,
          message: `Missing input parameter:${checkResult.inputData}`,
        });
      } else {
        let response = await db.User.findOne({
          where: { userName: data.userName, email: data.email },
        });
        if (response) {
          resolve({
            errCode: 2,
            message: "Account was existed",
          });
        } else {
          const hashPassword = await hashUserPassword(data.password);
          let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
          await db.User.create({
            userName: data.userName,
            fullName: data.fullName,
            email: data.email,
            password: hashPassword,
            address: data.address,
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            image: data.avatar,
            roleId: data.roleId ? data.roleId : "R2",
            token: token,
          });
          resolve({
            errCode: 0,
            message: "Created user account successfully",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
//Login
const checkUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { userName: data.userName },
      });
      if (response) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const loginService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkResult = await checkUser(data);
      if (!checkResult) {
        resolve({
          errCode: 2,
          message: "User not exist",
        });
      } else {
        const response = await db.User.findOne({
          where: { userName: data.userName },
          attributes: [
            "email",
            "userName",
            "password",
            "fullName",
            "image",
            "gender",
            "address",
            "phoneNumber",
            "token",
            "id",
            "roleId",
          ],
          raw: true,
        });
        if (response) {
          const checkPassword = await bcrypt.compareSync(
            data.password,
            response.password
          );
          if (checkPassword) {
            await delete response.password;
            let imgBase64 = "";
            if (response) {
              imgBase64 = new Buffer(response.image, "base64").toString(
                "binary"
              );
            }
            response.image = imgBase64;
            resolve({
              errCode: 0,
              message: "Login successful",
              data: response,
            });
          } else {
            resolve({
              errCode: 1,
              message: "Wrong password",
            });
          }
        }
      }
    } catch (error) {}
  });
};
//Create new order
const createNewOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Object.values(data).length <= 0) {
        resolve({
          errCode: 1,
          message: "Missing parameters",
        });
      } else {
        await db.Order.bulkCreate(data);
        resolve({
          errCode: 0,
          message: "Create new order successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
//Get order
const getAllOrderByUserIdService = (id, statusId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id && !statusId) {
        resolve({
          errCode: 1,
          message: "Missing parameters",
        });
      } else {
        let orders = "";
        if (statusId === "S1") {
          orders = await db.Order.findAll({
            where: { statusId: "S1", userId: id },
            include: [
              {
                model: db.Product,
                as: "productData",
                attributes: ["image"],
              },
            ],
            raw: false,
          });
          orders = orders.map((order) => {
            let data = order.productData;
            let image = new Buffer(data[0].image, "base64").toString("binary");
            order.img = image;
            return order;
          });
        } else {
          orders = await db.Order.findAll({
            where: { statusId: "S2", userId: id },
            include: [
              {
                model: db.Product,
                as: "productData",
                attributes: ["image"],
              },
            ],
          });
          // orders = orders.map((order) => {
          //   let img = order.productData.image;
          //   let image = new Buffer(img, "base64").toString("binary");
          //   orders.image = image;
          //   return orders;
          // });
        }
        if (orders && orders.length > 0) {
          resolve({
            errCode: 0,
            message: "Find all orders successfully",
            data: orders,
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

const searchProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameters",
        });
      } else {
        let products = "";
        let res = await db.Product.findAll({
          raw: false,
        });
        products = res.filter((item) =>
          item.productName.toLowerCase().includes(data)
        );
        if (products && products.length > 0) {
          products = products.map((product) => {
            let image = new Buffer(product.image, "base64").toString("binary");
            product.image = image;
            return product;
          });
          resolve({
            errCode: 0,
            message: "Search products successfully",
            data: products,
          });
        } else {
          resolve({
            errCode: 2,
            message: "Products not found",
            data: products,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const confirmOderShippedService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameters",
        });
      } else {
        let res = await db.Order.findOne({
          where: { id: data, statusId: "S2" },
        });
        if (res) {
          await res.destroy();
          resolve({
            errCode: 0,
            message: "Thank you for your order",
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
const deleteNewOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameters",
        });
      } else {
        let res = await db.Order.findOne({
          where: { id: data, statusId: "S1" },
        });
        if (res) {
          await res.destroy();
          resolve({
            errCode: 0,
            message: "Delete order successfully",
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
//Get user
const getUserDataService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          message: "Missing parameters",
        });
      } else {
        let users = await db.User.findAll({
          where: { roleId: data },
          attributes: {
            exclude: ["password"],
          },
          raw: false,
        });
        users = users.map((user) => {
          let image = new Buffer(user.image, "base64").toString("binary");
          user.image = image;
          return user;
        });
        if (users && users.length > 0) {
          resolve({
            errCode: 0,
            message: "Find all users successfully",
            data: users,
          });
        } else {
          resolve({
            errCode: 2,
            message: "Users not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUserService,
  loginService,
  createNewOrderService,
  getAllOrderByUserIdService,
  searchProductService,
  confirmOderShippedService,
  deleteNewOrderService,
  getUserDataService,
};
