/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");

const fs = require("fs");

const privateKey = fs.readFileSync("jwtRS256.key");

function verifyToken(req, res, next) {
  console.log("VERIFYTOKEN");

  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json("Unauthorized access");
  }

  try {
    const decoded = jwt.verify(token, privateKey);
    req.payload = decoded;
    next();
  } catch (error) {
    return res.status(401).json("Invalid token");
  }
}

const verifyTokenById = (req, res, next) => {
  try {
    if (req.payload.userId !== parseInt(req.params.id, 10)) {
      throw new Error("Token payload ID does not match request ID");
    }
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const verifyTokenByRoleAdminOrSelfId = (req, res, next) => {
  try {
    console.log("coucou");
    if (
      !(
        req.payload.is_admin ||
        req.payload.userId === parseInt(req.params.id, 10)
      )
    ) {
      throw new Error("Token payload Role Admin does not match requested role");
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json("You don't have the rights.");
  }
};

// const verifyTokenByRoleAdminOrSelfId = (req, res, next) => {
//   try {
//     if (
//       req.payload.is_admin || // Allow admins to delete any account
//       req.payload.userId === parseInt(req.params.id, 10) // Allow users to delete their own account
//     ) {
//       next();
//     } else {
//       throw new Error("Unauthorized access");
//     }
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(401);
//   }
// };

module.exports = {
  verifyToken,
  verifyTokenById,
  verifyTokenByRoleAdminOrSelfId,
};
