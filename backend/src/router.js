const express = require("express");

const {
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
} = require("./middleware/securityMiddleware");

const router = express.Router();

const loginController = require("./controllers/authControllers/LoginController");

router.post("/login", loginController);

const userControllers = require("./controllers/userControllers");

router.get("/user", userControllers.browse);
router.get("/user/:id", userControllers.read);
router.put(
  "/user/:id",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  userControllers.edit
);
router.post("/user", userControllers.add);
router.delete(
  "/user/:id",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  userControllers.destroy
);

const articleControllers = require("./controllers/articleControllers");

router.get("/article", articleControllers.browse);
router.get("/article/:id", articleControllers.read);
router.put(
  "/article/:id",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  articleControllers.edit
);
router.post("/article", articleControllers.add);
router.delete(
  "/article/:id",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  articleControllers.destroy
);

const ordersControllers = require("./controllers/ordersControllers");

router.get("/orders", ordersControllers.browse);
router.get("/orders/:id", ordersControllers.read);
router.put(
  "/orders/:id",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  ordersControllers.edit
);
router.post("/orders", ordersControllers.add);
router.delete(
  "/orders/:id",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  ordersControllers.destroy
);

const orderDetailsControllers = require("./controllers/orderDetailsControllers");

router.get("/order_details", orderDetailsControllers.browse);
router.get("/order_details/:id", orderDetailsControllers.read);
router.put(
  "/order_details/:id",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  orderDetailsControllers.edit
);
router.post("/order_details", orderDetailsControllers.add);
router.delete(
  "/order_details/:id",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  orderDetailsControllers.destroy
);

module.exports = router;
