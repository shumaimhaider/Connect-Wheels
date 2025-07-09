import { AppDataSource } from '../data-source';
import { User } from '../entity/user';

export const findUserById = async (userId: number) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOneBy({ id: userId });
        if (!user) {
            return false
        }
        return true;
    } catch (error) {
        throw error;
    }
};

export const getUserDetails = async (userId: number) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOneBy({ id: userId });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw error
    }
};
