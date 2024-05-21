import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({
            _id: user._id
        }, 'seretkey', {expiresIn: '7d'});

        const { passwordHash, ...userData } = user._doc;
        return res.status(200).json({
            ...userData, token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Login falure'
        })
    }
}

export const registration = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({
                errors
            })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);

        const doc = new User({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        })

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id
        }, 'secretkey', {expiresIn: '7d'});

        const { passwordHash, ...userData } = user._doc;
        return res.status(200).json({
            ...userData, token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Auth falure'
        })
    }
    
}

export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { passwordHash, ...userData } = user._doc;

        return res.json(userData);
    } catch (err) {
        res.status(403).json({ message: "No access"})
    }
}