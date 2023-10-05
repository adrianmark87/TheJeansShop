/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

// const generateSqlSets = require("../services/generateSqlSets");

class favouritesManager extends AbstractManager {
  constructor() {
    super({ table: "favourites" });
  }

  insert(favourite) {
    return this.connection
      .query(`INSERT INTO ${this.table} (user_id, article_id) VALUES (?, ?)`, [
        favourite.user_id,
        favourite.article_id,
      ])
      .then(([rows]) => {
        const bodyResponse = { ...favourite };
        bodyResponse.id = rows.insertId;
        return [{ status: 201, message: bodyResponse }];
      })
      .catch((error) => {
        return [{ status: 500, message: error }];
      });
  }

  findFavourites(user_id) {
    return this.connection.query(
      `SELECT * FROM favourites JOIN article ON favourites.article_id = article.id WHERE favourites.user_id = ?`,
      [user_id]
    );
  }

  findOneFavourite(article_id, user_id) {
    return this.connection.query(
      `SELECT * FROM favourites WHERE article_id = ? AND user_id = ?`,
      [article_id, user_id]
    );
  }

  deleteOneFavourite(article_id, user_id) {
    return this.connection.query(
      `DELETE FROM favourites WHERE article_id = ? AND user_id = ?`,
      [article_id, user_id]
    );
  }
}

module.exports = favouritesManager;
