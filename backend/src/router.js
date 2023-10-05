const express = require("express");

const {
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  verifyTokenById,
} = require("./middleware/securityMiddleware");

const router = express.Router();

const {
  loginController,
  logoutController,
} = require("./controllers/authControllers/LoginController");
const passwordForgottenController = require("./controllers/authControllers/PasswordForgottenController");
const passwordResetController = require("./controllers/authControllers/PasswordResetController");

router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/password_forgotten", passwordForgottenController);
router.post("/password_reset", passwordResetController);

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

router.get(
  "/order_details/orders/:order_id",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  orderDetailsControllers.browse
);
router.get(
  "/order_details/articles/:article_id/orders/:order_id",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  orderDetailsControllers.read
);
router.put(
  "/order_details/articles/:article_id/orders/:order_id",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  orderDetailsControllers.edit
);
router.post(
  "/order_details/orders/",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  orderDetailsControllers.add
);
router.delete(
  "/order_details/articles/:article_id/orders/:order_id",
  verifyToken,
  verifyTokenByRoleAdminOrSelfId,
  orderDetailsControllers.destroy
);

const favouritesControllers = require("./controllers/favouritesControllers");

// Define routes for the favourites manager
router.get(
  "/favourites/users/:user_id",
  verifyToken,
  favouritesControllers.findFavourites
);
router.get(
  "/favourites/articles/:article_id/users/:user_id",
  verifyToken,
  favouritesControllers.findOneFavourite
);
router.post(
  "/favourites",
  verifyToken, // Middleware for verifying the token
  favouritesControllers.insertFavourite
);
router.delete(
  "/favourites/articles/:article_id/users/:user_id",
  verifyToken,
  favouritesControllers.deleteOneFavourite
);

module.exports = router;
