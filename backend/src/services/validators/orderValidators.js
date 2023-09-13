const Joi = require("joi");

const validateOrders = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    date: Joi.string()
      .regex(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/)
      .presence(presence),
    status: Joi.string().max(155).presence(presence),
    card_no: Joi.string().max(20).presence(presence),
    expiration_date: Joi.string()
      .regex(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/)
      .presence(presence),
    cvv_code: Joi.number().positive().presence(presence),
    user_id: Joi.number().positive().presence(presence),
  }).validate(data, { abortEarly: false });
};

module.exports = { validateOrders };
