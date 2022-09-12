import Joi from 'joi';

const create = Joi.object({
  description: Joi.string().required(),
  tickers: Joi.array().items({
    ticker: Joi.string().max(20),
    count: Joi.number(),
    price: Joi.number(),
  }),
});

export default { create };
