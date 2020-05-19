import { Request, Response } from 'express';
import { error, success, done } from '../utils/res';
import { login } from '../model/User';
import { logger } from '../utils/logger';
import { authSchema } from '../joiSchema/authSchema';

export default class CategoryController {

    // @route: POST api/auth
    // @desc: get token
    // @access: Public

    login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        try {
            const { error, value } = authSchema.validate({ username: username, password: password })

            if (error) {
                throw new Error("Invalid")
            }
            const token = await login(username, password);
            success(res, { token: token })
        } catch (err) {
            logger.error(err.message);
            error(res, err.message)
        }
    }
}