const AbstractManager = require("./AbstractManager");

const generateSqlSets = require("../services/generateSqlSets");

class articleManager extends AbstractManager {
  constructor() {
    super({ table: "article" });
  }

  insert(article) {
    return this.connection.query(
      `insert into ${this.table} (name, category, size, gender, is_adult, colour, is_favourite, price, discount, quantity_stock) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        article.name,
        article.category,
        article.size,
        article.gender,
        article.is_adult,
        article.colour,
        article.is_favourite,
        article.price,
        article.discount,
        article.quantity_stock,
      ]
    );
  }

  update(id, article) {
    const sqlSets = generateSqlSets(article);

    return this.connection.query(
      `UPDATE ${this.table} SET ${sqlSets} WHERE id = ?`,
      [...Object.values(article), id]
    );
  }
}

module.exports = articleManager;
