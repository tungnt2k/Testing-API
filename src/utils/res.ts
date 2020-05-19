import { Response } from 'express';

export const success = (res: Response, data: any, total: number = 1, page: number = 1) => {
    return res.json({
        message: 'OK',
        status: 200,
        success: true,
        results: data,
        page: page,
        total: total
    })
}

export const error = (res: Response, msg: string, status: number = 400) => {
    return res.status(status).json({
        message: msg,
        status: status,
        success: false,
        results: null,
        page: 0,
        total: 0
    })
}

export const done = (res: Response, msg: string) => {
    return res.json({
        message: msg,
        status: 200,
        success: true,
        results: null,
        page: 0,
        total: 0
    })
}
