import { getRepository } from 'typeorm';
import { Level } from '../entity/Level';


export const getAllLevel = async () => {
    try {
        const repository = getRepository(Level);
        const levels = await repository.find();
        return levels;
    } catch (err) {
        throw err
    }
}

export const addLevel = async (name: string) => {
    try {
        const repository = getRepository(Level);
        let level = new Level();
        level.name = name;
        await repository.save(level);
        return level;
    } catch (err) {
        throw err
    }
}

export const updateLevel = async (id: number, name: string) => {
    try {
        const repository = getRepository(Level);
        let level = await repository.findOne(id);

        if (!level) {
            throw new Error('Not found')
        }

        level.name = name;
        await repository.save(level);

        return level
    } catch (err) {
        throw err
    }
}

export const deleteLevel = async (id: number) => {
    try {
        const repository = getRepository(Level);
        const level = await repository.findOne(id);
        if (!level) {
            throw new Error("Not found")
        }

        await repository.remove(level)

    } catch (err) {
        throw err
    }

}