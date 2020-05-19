import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';

export const getAllCategories = async () => {
    try {
        const repository = getRepository(Category);
        const cates = await repository.find();
        return cates
    } catch (err) {
        throw err
    }
}

export const addCategory = async (name: string) => {
    try {
        const repository = getRepository(Category);
        let category = new Category();
        category.name = name;
        await repository.save(category);
        return category;
    } catch (err) {
        throw err
    }
}

export const updateCategory = async (id: number, name: string) => {
    try {
        const repository = getRepository(Category);
        let category = await repository.findOne(id);

        if (!category) {
            throw new Error('Not found')
        }

        category.name = name;
        await repository.save(category);

        return category
    } catch (err) {
        throw err
    }
}

export const deleteCategory = async (id: number) => {
    try {
        const repository = getRepository(Category);
        const category = await repository.findOne(id);
        if (!category) {
            throw new Error("Not found")
        }

        await repository.remove(category)

    } catch (err) {
        throw err
    }

}