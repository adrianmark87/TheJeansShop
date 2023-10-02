/* eslint-disable camelcase */
const models = require("../models"); // Import your models or managers

const findFavourites = (req, res) => {
  const { user_id } = req.params;

  models.favourites
    .findFavourites(user_id) // Use the appropriate function from your favourites manager
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findOneFavourite = (req, res) => {
  const { article_id, user_id } = req.params;

  models.favourites
    .findOneFavourite(article_id, user_id) // Use the appropriate function from your favourites manager
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const insertFavourite = (req, res) => {
  const { user_id, article_id } = req.body;

  const favourite = {
    user_id,
    article_id,
  };

  models.favourites
    .insert(favourite) // Use the appropriate function from your favourites manager
    .then(([rows]) => {
      // Assuming the insert function returns the inserted favourite
      res.status(201).json(rows[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  insertFavourite,
};

const deleteOneFavourite = (req, res) => {
  const { article_id, user_id } = req.params;

  models.favourites
    .deleteOneFavourite(article_id, user_id) // Use the appropriate function from your favourites manager
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  findFavourites,
  findOneFavourite,
  insertFavourite,
  deleteOneFavourite,
};
