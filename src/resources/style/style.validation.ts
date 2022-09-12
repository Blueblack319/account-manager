import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().required(),
});

export default { create };
