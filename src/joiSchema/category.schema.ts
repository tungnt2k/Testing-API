import Joi from '@hapi/joi';

export const categorySchema = Joi.object({
    name: Joi.string().required()
})