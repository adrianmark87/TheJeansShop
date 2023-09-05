/* eslint-disable camelcase */
const Joi = require("joi");

const validateOrderDetails = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    article_id: Joi.number().positive().presence(presence),
    order_id: Joi.number().positive().presence(presence),
    quantity: Joi.number().positive().presence(presence),
  }).validate(data, { abortEarly: false });
};

module.exports = { validateOrderDetails };
