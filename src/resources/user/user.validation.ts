import Joi from 'joi';

const register = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().max(20),
  isShared: Joi.boolean().required(),
  isAnonym: Joi.boolean().required(),
});

const login = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().min(6).required(),
});

export default { register, login };
