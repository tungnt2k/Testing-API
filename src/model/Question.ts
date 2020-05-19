import { getRepository } from 'typeorm';
import { Question } from '../entity/Question';

export const getAll = () => {
    try {
        const repository = getRepository(Question);
        const questions = repository.find({
            relations: ["levelId", "categoryId"]
        });
        return questions;
    } catch (err) {
        throw err
    }
}

export const getByLevelId = (levelId: number) => {
    try {
        const repository = getRepository(Question);
        const questions = repository.find({
            where: {
                levelId: levelId
            },
            relations: ["levelId", "categoryId"]
        })
        return questions;
    } catch (err) {
        throw err
    }
}

export const getByCateId = (cateId: number) => {
    try {
        const repository = getRepository(Question);
        const questions = repository.find({
            where: {
                categoryId: cateId
            },
            relations: ["levelId", "categoryId"]
        })
        return questions;
    } catch (err) {
        throw err
    }
}

export const getToMix = (levelId: number, cateId: number) => {
    try {
        const repository = getRepository(Question);
        const questions = repository.find({
            select: ["id", "body", "categoryId", "levelId"],
            where: {
                levelId: levelId,
                categoryId: cateId
            },
            relations: ["levelId", "categoryId"]
        })
        return questions;
    } catch (err) {
        throw err
    }
}

export const getQuestion = (id: number) => {
    try {
        const repository = getRepository(Question);
        const question = repository.findOne({
            where: {
                id: id
            }
        })
        return question;
    } catch (err) {
        throw err
    }
}


export const addQuestion = async (question: Question) => {
    try {
        const repository = getRepository(Question);
        const newQuestion = new Question();

        newQuestion.body = question.body;
        newQuestion.result = question.result;
        newQuestion.categoryId = question.categoryId;
        newQuestion.levelId = question.levelId;

        await repository.save(newQuestion);

        const questionRelations = repository.findOne({
            where: {
                id: newQuestion.id
            },
            relations: ["levelId", "categoryId"]
        });
        return questionRelations;
    } catch (err) {
        throw err
    }
}

export const updateQuestion = async (id: number, question: { body: string, result: string }) => {
    try {
        const repository = getRepository(Question);
        let questionStored = await repository.findOne({
            where: {
                id: id
            },
            relations: ["levelId", "categoryId"]
        })

        if (!questionStored) {
            throw new Error("Not found")
        }

        questionStored.body = question.body;
        questionStored.result = question.result;

        await repository.save(questionStored);

        return questionStored;
    } catch (err) {
        throw err
    }
}

export const deleteQuestion = async (id: number) => {
    try {
        const repository = getRepository(Question);
        let questionStored = await repository.findOne(id)

        if (!questionStored) {
            throw new Error("Not found")
        }

        await repository.remove(questionStored);

    } catch (err) {
        throw err
    }
}