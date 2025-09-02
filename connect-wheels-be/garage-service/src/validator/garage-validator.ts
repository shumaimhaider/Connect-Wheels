import { body } from 'express-validator';

export const createGarageValidator = [
  body('garageName')
    .notEmpty()
    .withMessage('Garage name is required'),

  body('userID')
    .notEmpty()
    .withMessage('Owner is required')
    .isInt()
    .withMessage('Owner must be valid'),

  body('pictureUrl')
    .optional()
    .isURL()
    .withMessage('Picture URL must be a valid URL'),
];
