const AbstractManager = require("./AbstractManager");

const generateSqlSets = require("../services/generateSqlSets");
const { passwordHasher } = require("../services/passwordHelper");

const NotificationPushService = require("../services/NotificationPushService");
const EmailSenderService = require("../services/EmailSenderService");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async insert(user) {
    console.log("USER : ", user);
    const hashedPassword = await passwordHasher(user.password);
    return this.connection
      .query(
        `insert into ${this.table} (first_name, last_name, birth_date, phone, email, address, zip_code, city, password, is_admin, subscription_date, expo_push_token) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
        [
          user.first_name,
          user.last_name,
          user.birth_date,
          user.phone,
          user.email,
          user.address,
          user.zip_code,
          user.city,
          hashedPassword,
          user.is_admin,
          user.expo_push_token,
        ]
      )
      .then(async ([rows]) => {
        const bodyResponse = { ...user };
        bodyResponse.id = rows.insertId;

        // Send registration notification
        await NotificationPushService("REGISTRATION", {
          expo_push_token: user.expo_push_token,
        });

        // Send registration email
        EmailSenderService("REGISTRATION", {
          email: user.email,
          fullName: `${user.first_name} ${user.last_name}`,
        });

        return [{ status: 201, message: bodyResponse }]; // Wrap the object in an array
      })
      .catch((error) => {
        return [{ status: 500, message: error }]; // Wrap the error in an array
      });
  }

  async update(id, user) {
    const sqlSets = generateSqlSets(user);
    // console.log("userrrrr", user);
    user.password = await passwordHasher(user.password);
    return this.connection.query(
      `UPDATE ${this.table} SET ${sqlSets} WHERE id = ?`,
      [...Object.values(user), id]
    );
  }
}

module.exports = userManager;
