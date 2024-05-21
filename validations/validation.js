import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Incorrect format of email').isEmail(),
    body('password', 'Password should be at least 5 symbols').isLength({min: 5}),
    body('fullName', 'Input your name, min 3 char').isLength({min: 3}),
    body('avatarUrl', 'Incorrect link').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Incorrect format of email').isEmail(),
    body('password', 'Password should be at least 5 symbols').isLength({min: 5})
];

export const postValidation = [
    body('title', 'Set your title').isLength({min: 1}),
    body('text', 'Set your text').isLength({min: 3}),
    body('tags', 'Incorrect format for tags').optional(),
    body('imageUrl', 'Incorrect link').optional()
]