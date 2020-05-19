import { User } from '../entity/User';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';

export const login = async (username: string, password: string) => {
    const repository = getRepository(User);
    const user = await repository.findOne({
        where: {
            username: username
        }
    });

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid username or password")
    }

    const payload = {
        user: {
            username: user.username
        }
    }

    const token = sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: 60 * 60 * 24,
            algorithm: 'HS256'
        }
    )
    return token
}