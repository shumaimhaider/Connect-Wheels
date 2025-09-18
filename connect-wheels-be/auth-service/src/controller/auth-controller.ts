import { Request, Response } from "express";
import { validationResult } from "express-validator";

import authService from "../service/auth_service"
import { CreateUserDTO, toCreateUserDTO } from "../dtos/createUserDto";
import { LoginUserDTO, toLoginUserDTO } from "../dtos/loginUserDto";

const registerUser = async (req: Request, res: Response) => {
    // Validation request inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user: CreateUserDTO = toCreateUserDTO(req.body);
    try {
        const result = await authService.registerUser(user);
        return res.status(201).json({ message: result.message });
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

    const user: LoginUserDTO = toLoginUserDTO(req.body)

    try {
        const result = await authService.loginUser(user)
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