import { Request, Response } from 'express';
import { error, success, done } from '../utils/res';
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../model/category.model';
import { logger } from '../utils/logger';
import { categorySchema } from '../joiSchema/category.schema';

export default class CategoryController {

    // @route: GET api/category
    // @desc: Get all categories
    // @access: Public
    getAll = async (req: Request, res: Response) => {
        try {
            const categories = await getAllCategories();
            success(res, categories, categories.length)
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: POST api/category
    // @desc: Add category
    // @access: Private
    addCate = async (req: Request, res: Response) => {
        const { name } = req.body;
        try {
            const { error, value } = categorySchema.validate({ name: name })

            if (error) {
                throw new Error("Invalid")
            }
            const category = await addCategory(name);
            success(res, category)
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: PUT api/category/:id
    // @desc: Update category
    // @access: Private
    updateCate = async (req: Request, res: Response) => {
        const { name } = req.body;
        const { id } = req.params;
        try {
            const { error, value } = categorySchema.validate({ name: name })

            if (error) {
                throw new Error("Invalid")
            }
            const category = await updateCategory(parseInt(id), name);
            success(res, category)
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: DELETE api/category/:id
    // @desc: Delete category
    // @access: Private
    deleteCate = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await deleteCategory(parseInt(id));
            done(res, "Deleted")
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }
}