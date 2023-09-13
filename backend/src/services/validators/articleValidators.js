/* eslint-disable camelcase */
const Joi = require("joi");

const validateArticle = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    name: Joi.string().max(255).presence(presence),
    category: Joi.string().max(255).presence(presence),
    size: Joi.string().max(255).presence(presence),
    gender: Joi.string().max(255).presence(presence),
    is_adult: Joi.boolean().presence(presence),
    colour: Joi.string().max(255).presence(presence),
    is_favourite: Joi.boolean().presence(presence),
    price: Joi.number().positive().presence(presence),
    discount: Joi.number().positive().presence(presence),
    quantity_stock: Joi.number().positive().presence(presence),
  }).validate(data, { abortEarly: false });
};

module.exports = { validateArticle };
