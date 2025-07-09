import { body } from "express-validator";

export const loginValidator = [
    body('username').isString().notEmpty().withMessage('Uername is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
    body('otp').optional().isNumeric().withMessage('OTP is required'),
];

export const registerValidator = [
    body('username').isString().notEmpty().withMessage('Uername is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
];
