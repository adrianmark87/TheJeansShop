const AbstractManager = require("./AbstractManager");

const generateSqlSets = require("../services/generateSqlSets");

class ordersManager extends AbstractManager {
  constructor() {
    super({ table: "orders" });
  }

  insert(orders) {
    return this.connection.query(
      `insert into ${this.table} (date, status, card_no, expiration_date, cvv_code,user_id) values (?, ?, ?, ?, ?, ?)`,
      [
        orders.date,
        orders.status,
        orders.card_no,
        orders.expiration_date,
        orders.cvv_code,
        orders.user_id,
      ]
    );
  }

  update(id, orders) {
    const sqlSets = generateSqlSets(orders);

    return this.connection.query(
      `UPDATE ${this.table} SET ${sqlSets} WHERE id = ?`,
      [...Object.values(orders), id]
    );
  }
}

module.exports = ordersManager;
