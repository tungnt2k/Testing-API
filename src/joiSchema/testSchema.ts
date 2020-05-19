import Joi from '@hapi/joi';

export const createTestSchema = Joi.object({
    staffName: Joi.string()
        .required(),

    staffId: Joi.string()
        .required(),

    levelId: Joi.number()
        .min(1)
        .required(),

    categoryId: Joi.number()
        .min(1)
        .required()
})


const answer = Joi.object().keys({
    id: Joi.number()
        .min(1)
        .required(),
    answer: Joi.string()
        .allow('')
        .required()
})

export const submitTestSchema = Joi.object({
    testId: Joi.number()
        .min(1)
        .required(),
    answers: Joi.array()
        .items(answer)
})
