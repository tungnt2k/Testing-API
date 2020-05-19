import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { error } from '../utils/res';
import { logger } from '../utils/logger';

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');

    if (!token) {
        return error(res, 'No token', 404)
    }

    try {
        const decode: any = verify(token, process.env.JWT_SECRET);

        next();
    } catch (err) {
        logger.error(err.message)
        return error(res, 'Token is not valid', 404)
    }

}