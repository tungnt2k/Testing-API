import { Request, Response } from 'express';
import { done, success, error } from '../utils/res';
import { getAll, addQuestion, updateQuestion, deleteQuestion, getByLevelId, getByCateId } from '../model/question.model';
import { Question } from '../entity/Question';
import { questionSchema, updateQuestionSchema } from '../joiSchema/question.schema';
import { logger } from '../utils/logger';

export default class {

    // @route: GET api/question
    // @desc: Get all question
    // @access: Private
    getAll = async (req: Request, res: Response) => {
        try {
            const questions = await getAll();
            success(res, questions, questions.length)
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: GET api/question/category/:categoryId
    // @desc: Get all question by categoryId
    // @access: Private
    getAllByLevelId = async (req: Request, res: Response) => {
        const { levelId } = req.params;
        try {
            const questions = await getByLevelId(parseInt(levelId));
            success(res, questions, questions.length);
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: GET api/question/level/:levelId
    // @desc: Get all question by levelId
    // @access: Private
    getAllByCateId = async (req: Request, res: Response) => {
        const { categoryId } = req.params;
        try {
            const questions = await getByCateId(parseInt(categoryId));
            success(res, questions, questions.length);
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: POST api/question
    // @desc: Add new question
    // @access: Private
    addQuestion = async (req: Request, res: Response) => {
        const newQuestion = new Question();
        newQuestion.body = req.body.body;
        newQuestion.result = req.body.result;
        newQuestion.levelId = req.body.levelId;
        newQuestion.categoryId = req.body.categoryId;
        try {

            const { error, value } = questionSchema.validate(newQuestion)

            if (error) {
                throw new Error("invalid")
            }

            const question = await addQuestion(newQuestion);
            success(res, question)
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: PUT api/question/:id
    // @desc: Update a question
    // @access: Private
    updateQuestion = async (req: Request, res: Response) => {
        const question: any = {}
        const id = parseInt(req.params.id)
        question.body = req.body.body;
        question.result = req.body.result;
        try {

            const { error, value } = updateQuestionSchema.validate(question)

            if (error) {
                throw new Error("invalid")
            }

            const updatedQuestion = await updateQuestion(id, question);
            success(res, updatedQuestion)
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: DELETE api/question/:id
    // @desc: Delete a question
    // @access: Private
    deleteQuestion = async (req: Request, res: Response) => {
        const { id } = req.params
        try {

            await deleteQuestion(parseInt(id));
            done(res, "Deleted")
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }
}