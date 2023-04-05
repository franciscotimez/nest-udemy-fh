import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGO_DB: Joi.string().required(),
  PORT: Joi.number().required(),
  DEFAULT_LIMIT: Joi.number().default(20),
});
