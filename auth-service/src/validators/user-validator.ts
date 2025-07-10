import { body } from "express-validator";

export const deleteUserValidator = [
    body('userID').isInt().notEmpty().withMessage('User is required'),
];
