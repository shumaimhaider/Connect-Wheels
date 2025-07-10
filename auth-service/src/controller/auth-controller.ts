import { Request, Response } from "express";
import { validationResult } from "express-validator";

import authService from "../service/auth_service"

const registerUser = async (req: Request, res: Response) => {
    // Validation request inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    try {
        const result = await authService.registerUser(username, password);
        return res.status(201).json({ message: result.message, userId: result.userId });
    } catch (error) {
        console.error("register user", error);
        return res.status(500).json({ message: 'error registering user', error: error });
    }
};

const loginUser = async (req: Request, res: Response) => {
    // Validation request inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, password, otp } = req.body;

    try {
        const result = await authService.loginUser(username, password, otp)
        return res.status(200).json({ message: result.message, token: result.token });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'error login user', error: error });
    }
};


const Authcontroller = {
    registerUser,
    loginUser
}

export default Authcontroller