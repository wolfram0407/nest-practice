// src/config/configuration.ts
import * as Joi from '@hapi/joi';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  mongodbUri: process.env.MONGODB_URI,
});

export const validationSchema = Joi.object({
  PORT: Joi.number().default(4000),
  MONGODB_URI: Joi.string().uri().required(),
});
