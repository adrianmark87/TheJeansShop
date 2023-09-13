/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

const generateSqlSets = require("../services/generateSqlSets");

class orderDetailsManager extends AbstractManager {
  constructor() {
    super({ table: "order_details" });
  }

  insert(order_details) {
    return this.connection.query(
      `insert into ${this.table} (article_id, order_id, quantity) values (?, ?, ?)`,
      [order_details.article_id, order_details.order_id, order_details.quantity]
    );
  }

  update(id, order_details) {
    const sqlSets = generateSqlSets(order_details);

    return this.connection.query(
      `UPDATE ${this.table} SET ${sqlSets} WHERE id = ?`,
      [...Object.values(order_details), id]
    );
  }
}

module.exports = orderDetailsManager;
