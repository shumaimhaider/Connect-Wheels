import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../data-source";
import { User } from "../entity/user";


const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

const registerUser = async (username: string, password: string) => {
    try {
        const userModel = AppDataSource.getRepository(User);
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await userModel.save({
            username,
            passwordHash,
            role: 'user'
        });
        return { message: "Registered Successfully", userId: user?.id };
    } catch (error) {
        console.error(error);
        return { message: "error registering user", error: error };
    }
};


// Login a user and check if user is registered for TOPT if not then issue jwt token
 const loginUser = async (username: string, password: string, otp: string) => {
    try {
        const userRepository = AppDataSource.getRepository(User);

        // Cheroleck if the user exists
        const user = await userRepository.findOne({ where: { username } });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user?.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }


        // Generate JWT token
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        return { message: 'Login successful', token };
    } catch (error) {
        console.log(error)
        return { message: false, error: error }
    }
};


const authService = {
    registerUser,
    loginUser,
};


export default authService;
