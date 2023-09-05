const AbstractManager = require("./AbstractManager");

const generateSqlSets = require("../services/generateSqlSets");
const { passwordHasher } = require("../services/passwordHelper");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async insert(user) {
    const hashedPassword = await passwordHasher(user.password);
    return this.connection.query(
      `insert into ${this.table} (first_name, last_name, birth_date, phone, email, adress, zip_code, city, password, is_admin, subscription_date) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.first_name,
        user.last_name,
        user.birth_date,
        user.phone,
        user.email,
        user.adress,
        user.zip_code,
        user.city,
        hashedPassword,
        user.is_admin,
        user.subscription_date,
      ]
    );
  }

  update(id, user) {
    const sqlSets = generateSqlSets(user);

    return this.connection.query(
      `UPDATE ${this.table} SET ${sqlSets} WHERE id = ?`,
      [...Object.values(user), id]
    );
  }
}

module.exports = userManager;
