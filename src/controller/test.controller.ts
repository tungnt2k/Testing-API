import { Request, Response } from 'express';
import { error, success, done } from '../utils/res';
import { getAllTests, delTest, createTest, checkResult, getTestDetail } from '../model/Test';
import { createTestSchema, submitTestSchema } from '../joiSchema/testSchema';
import { genQuestion, getTestQuestionsByTestId } from '../model/TestQuestion';
import { logger } from '../utils/logger';

export default class {

    // @route: GET api/test
    // @desc: Get all test
    // @access: Private
    getAll = async (req: Request, res: Response) => {
        try {
            const tests = await getAllTests();
            success(res, tests, tests.length)
        } catch (err) {
            logger.error(err.message);
            error(res, err.message);
        }
    }

    // @route: GET api/test/:id
    // @desc: Get test detail
    // @access: Private
    testDetail = async (req: Request, res: Response) => {
        try {
            const test = await getTestDetail(parseInt(req.params.id));
            const detail = await getTestQuestionsByTestId(parseInt(req.params.id))
            success(res, {
                test: test,
                detail: detail
            })
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: POST api/test/
    // @desc: Create test and gen questions
    // @access: Public
    createTest = async (req: Request, res: Response) => {
        const testFields: any = {}
        testFields.staffName = req.body.staffName;
        testFields.staffId = req.body.staffId;
        testFields.levelId = req.body.levelId;
        testFields.categoryId = req.body.categoryId;
        try {
            const { error, value } = createTestSchema.validate(testFields)
            if (error) {
                throw new Error("Invalid")
            }

            const test = await createTest(testFields);

            const questions = await genQuestion(test)

            success(res, {
                test: test,
                questions: questions
            })

        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: POST api/test/check
    // @desc: Check result
    // @access: Public
    checkResult = async (req: Request, res: Response) => {
        const { testId, answers } = req.body
        try {

            const { error, value } = submitTestSchema.validate({ testId: testId, answers: answers })
            if (error) {
                throw new Error("Invalid")
            }

            const test = await checkResult(testId, answers);
            success(res, test);
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: DELETE api/test/:id
    // @desc: Delete test
    // @access: Private
    deleteTest = async (req: Request, res: Response) => {
        try {
            await delTest(parseInt(req.params.id));
            done(res, "Deleted")
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }
}