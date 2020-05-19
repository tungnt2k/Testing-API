import { getRepository } from 'typeorm';
import { Test } from '../entity/Test';
import { getTestQuestionsByTestId, updateAnswer, updateAnswers } from './testQuestion.model';
import { TotalQuestion, TimeLimit } from '../config/TestConfig';
import { getQuestion } from './question.model';
import { TestQuestion } from '../entity/TestQuestion';

export const getAllTests = async () => {
    try {
        const repository = getRepository(Test);
        const tests = await repository.find({
            relations: ["categoryId", "levelId"]
        });
        return tests
    } catch (err) {
        throw err
    }
}

export const createTest = async (testField: { staffName: string, staffId: string, levelId: number, categoryId: number }) => {
    try {
        const repository = getRepository(Test);

        const test = new Test();
        test.staffName = testField.staffName;
        test.staffId = testField.staffId;
        test.levelId = testField.levelId;
        test.categoryId = testField.categoryId;
        test.totalQuestions = TotalQuestion;
        test.timeLimit = TimeLimit;

        const newTest = await repository.save(test);
        return newTest
    } catch (err) {
        throw err
    }
}

export const delTest = async (id: number) => {
    try {
        const testRepos = getRepository(Test);
        const testQuestionRepos = getRepository(TestQuestion);

        const test = await testRepos.findOne(id);
        if (!test) {
            throw new Error("Not found");
        }

        const testQuestions = await testQuestionRepos.find({
            where: {
                testId: id
            }
        })

        await testQuestionRepos.remove(testQuestions)

        await testRepos.remove(test);
    } catch (err) {
        throw err
    }
}

export const getTestDetail = async (id: number) => {
    try {
        const repository = getRepository(Test);
        const test = await repository.findOne({
            where: {
                id: id
            }
        })
        return test
    } catch (err) {
        throw err
    }
}

export const checkResult = async (testId: number, answers: []) => {
    try {
        const testRepos = getRepository(Test);
        const test = await testRepos.findOne(testId);
        if (!test) {
            throw new Error("Not found")
        }

        await updateAnswers(answers);

        let passQuestion = 0;

        const promises = answers.map(async (a: {
            id: number;
            answer: string;
        }) => {
            const question = await getQuestion(a.id);
            if (question.result === a.answer) {
                passQuestion++;
            }
        })

        await Promise.all(promises);

        if (test.isSubmit) {
            throw new Error('Test has finished')
        }
        test.isSubmit = true;
        test.timeEnd = new Date()
        test.passQuestions = passQuestion;
        await testRepos.save(test);

        return test

    } catch (err) {
        throw err
    }
}