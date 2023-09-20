/* eslint-disable camelcase */
const jwt = require("jsonwebtoken");
const fs = require("fs");
const connection = require("./database");
const { passwordVerification } = require("../services/passwordHelper");
const {
  forgottenPasswordTokenGenerator,
} = require("../services/passwordHelper");
const kindChecker = require("../services/EmailSenderService");

const privateKey = fs.readFileSync("jwtRS256.key");

function login({ email, password }) {
  return connection
    .promise()
    .query("SELECT * FROM user WHERE email = ?", [email])
    .then(async ([rows]) => {
      if (rows.length === 0) {
        return { status: 401, message: "Email or password is wrong" };
      }
      if (!(await passwordVerification(password, rows[0].password))) {
        return { status: 401, message: "Email or password is wrong" };
      }

      const { id, role, first_name, last_name, is_admin } = rows[0]; // Extract first_name and last_name from rows[0]

      const token = jwt.sign(
        {
          userId: id,
          role,
          first_name,
          last_name,
          is_admin,
        },
        privateKey,
        {
          algorithm: "RS256",
        }
      );

      return { status: 200, message: { token } };
    });
}

async function updatePasswordTokenAndDateOfExpiration(email) {
  const { token, dateOfExpiration } = forgottenPasswordTokenGenerator();

  connection
    .promise()
    .query(
      "UPDATE user SET password_token = ?, password_token_expiration = ? where email = ?",
      [token, dateOfExpiration, email]
    )
    .catch((error) => console.log(error));

  return token;
}

function passwordForgotten({ email }) {
  return connection
    .promise()
    .query("SELECT * FROM user WHERE email = ?", [email])
    .then(async ([rows]) => {
      if (rows.length === 0) {
        return { status: 404, message: "Email doesn't exist" };
      }

      const token = await updatePasswordTokenAndDateOfExpiration(email);
      kindChecker("PASSWORD_FORGOTTEN", { email, token });

      return { status: 200, message: "success" };
    });
}

module.exports = {
  login,
  passwordForgotten,
};
