import { getRepository } from 'typeorm';
import { Question } from '../entity/Question';
import { TestQuestion } from '../entity/TestQuestion';
import { Test } from '../entity/Test';
import { getToMix } from '../model/Question';
import { TotalQuestion } from '../config/TestConfig';

export const genQuestion = async (testDetail: Test) => {
    try {

        //Get all questions
        const questions = await getToMix(testDetail.levelId, testDetail.categoryId);

        if (questions.length < TotalQuestion) {
            throw new Error("Not enough question")
        }
        //Mix question
        questions.sort(() => 0.5 - Math.random());

        //Pick question
        const ramdomQuestions = questions.slice(0, TotalQuestion);

        //Store relation
        const testQuestionRepos = getRepository(TestQuestion)
        // Sử dụng forEach với async await đem lại thứ tự k mong muốn :)))
        await ramdomQuestions.forEach(async (q: Question) => {
            const testQuestion = new TestQuestion();
            testQuestion.testId = testDetail.id;
            testQuestion.questionId = q.id;
            await testQuestionRepos.save(testQuestion)
        })

        return ramdomQuestions;

    } catch (err) {
        throw err
    }
}


export const getTestQuestionsByTestId = async (testId: number) => {
    try {
        const testQuestionRepos = getRepository(TestQuestion);
        const testQuestions = await testQuestionRepos.find({
            where: {
                testId: testId
            },
            relations: ["questionId"]
        })

        return testQuestions;
    } catch (err) {
        throw err
    }
}


export const updateAnswers = async (answers: []) => {
    const promises = answers.map(async (a: {
        id: number;
        answer: string;
    }) => {
        await updateAnswer(a.id, a.answer);
    })

    await Promise.all(promises);
}

export const updateAnswer = async (questionId: number, answer: string) => {
    try {
        const testQuestionRepos = getRepository(TestQuestion);
        const testQuestion = await testQuestionRepos.findOne({
            where: {
                questionId: questionId
            }
        })
        testQuestion.answer = answer;
        await testQuestionRepos.save(testQuestion);
    } catch (err) {
        throw err
    }
}