import { body } from "express-validator";

export const loginValidator = [
    body('email').isString().notEmpty().withMessage('email is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
];

export const registerValidator = [
    body('email').isString().notEmpty().withMessage('email is required'),
    body('firstName').isString().notEmpty().withMessage('email is required'),
    body('lastName').isString().notEmpty().withMessage('email is required'),  
    body('password').isString().notEmpty().withMessage('Password is required'),
];

