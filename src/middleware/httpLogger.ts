import { logger } from '../utils/logger';
import morgan from 'morgan';

class streamMorganToLogger {
    write(text: string) {
        logger.info(text)
    }
};

let myStream = new streamMorganToLogger()

export const httpLogger = morgan(':method  :url   :status   :response-time ms - :res[content-length]', { stream: myStream })
