import Joi from '@hapi/joi';

export const authSchema = Joi.object({
    username: Joi.string().alphanum().required(),
    password: Joi.string().alphanum().required()
})