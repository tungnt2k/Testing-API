import { Request, Response } from 'express';
import { error, success, done } from '../utils/res';
import { getAllLevel, addLevel, updateLevel, deleteLevel } from '../model/Level';
import { levelSchema } from '../joiSchema/levelSchema';
import { logger } from '../utils/logger';

export default class LevelController {

    // @route: GET api/level
    // @desc: Get all levels
    // @access: Public
    getAll = async (req: Request, res: Response) => {
        try {
            const levels = await getAllLevel();
            success(res, levels, levels.length)
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: POST api/level
    // @desc: Add level
    // @access: Private
    addLevel = async (req: Request, res: Response) => {
        const { name } = req.body;
        try {
            const { error, value } = levelSchema.validate({ name: name })

            if (error) {
                throw new Error("Invalid")
            }

            const level = await addLevel(name);
            success(res, level)
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: PUT api/level/:id
    // @desc: Update level
    // @access: Private
    updateLevel = async (req: Request, res: Response) => {
        const { name } = req.body;
        const { id } = req.params;
        try {
            const { error, value } = levelSchema.validate({ name: name })

            if (error) {
                throw new Error("Invalid")
            }

            const level = await updateLevel(parseInt(id), name);
            success(res, level)
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }

    // @route: DELETE api/level/:id
    // @desc: Delete level
    // @access: Private
    deleteLevel = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await deleteLevel(parseInt(id));
            done(res, "Deleted")
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }
}