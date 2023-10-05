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

  update(quantity, article_id, order_id) {
    return this.connection.query(
      `UPDATE ${this.table} SET quantity = ? WHERE order_details.article_id = ? AND order_details.order_id = ? `,
      [quantity, article_id, order_id]
    );
  }

  findOrders(order_id) {
    return this.connection.query(
      `SELECT * FROM order_details JOIN article ON order_details.article_id = article.id WHERE order_details.order_id = ?`,
      [order_id]
    );
  }

  findOneOrder(article_id, order_id) {
    return this.connection.query(
      `SELECT * FROM order_details WHERE article_id = ? AND order_id = ?`,
      [article_id, order_id]
    );
  }

  deleteOneOrder(article_id, order_id) {
    return this.connection.query(
      `DELETE FROM order_details WHERE article_id = ? AND order_id = ?`,
      [article_id, order_id]
    );
  }
}

module.exports = orderDetailsManager;
