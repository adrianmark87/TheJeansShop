/* eslint-disable camelcase */
const Joi = require("joi");

const validateUser = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    first_name: Joi.string().max(155).presence(presence),
    last_name: Joi.string().max(155).presence(presence),
    birth_date: Joi.string()
      .regex(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/)
      .presence(presence),
    phone: Joi.string().max(15).presence(presence),
    email: Joi.string().email().presence(presence),
    adress: Joi.string().max(155).presence(presence),
    zip_code: Joi.number().positive().presence(presence),
    city: Joi.string().max(155).presence(presence),
    password: Joi.string().max(155).presence(presence),
    is_admin: Joi.boolean().presence(presence),
    subscrition_date: Joi.string()
      .regex(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/)
      .presence(presence),
  }).validate(data, { abortEarly: false });
};

module.exports = { validateUser };
