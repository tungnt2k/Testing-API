import Joi from '@hapi/joi';

export const questionSchema = Joi.object({
    body: Joi.string()
        .required(),
    result: Joi.string()
        .required(),
    levelId: Joi.number()
        .min(1)
        .required(),
    categoryId: Joi.number()
        .min(1)
        .required()
})

export const updateQuestionSchema = Joi.object({
    body: Joi.string()
        .required(),
    result: Joi.string()
        .required(),
})