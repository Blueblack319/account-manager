import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().required(),
  deals: Joi.array().items({
    description: Joi.string().required(),
    tickers: Joi.array().items({
      ticker: Joi.string().max(20),
      count: Joi.number(),
      buyingPrice: Joi.number(),
    }),
  }),
});

export default { create };
