import Joi from '@hapi/joi';

export const levelSchema = Joi.object({
    name: Joi.string().required()
})