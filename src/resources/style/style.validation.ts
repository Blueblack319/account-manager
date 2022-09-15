import Joi from 'joi';

const createVal = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().required(),
  isShared: Joi.boolean().required(),
  isAnonym: Joi.boolean().required(),
});

const editVal = Joi.object({
  name: Joi.string().max(50),
  description: Joi.string(),
  isShared: Joi.boolean(),
  isAnonym: Joi.boolean(),
});

export default { createVal, editVal };
