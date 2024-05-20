import express from 'express';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { registerValidation, loginValidation } from './validations/auth.js';
import User from './models/User.js';

const app = express();
app.use(express.json());

mongoose
.connect('mongodb+srv://admin:12345@cluster0.oyurklw.mongodb.net/blogdb?retryWrites=true&w=majority')
.then(console.log('DB is OK'))
.catch((err) => console.log('DB is NOT OK', err))

app.get('/', (req, res) => {
    res.send('Hello world')
});
app.post('/auth/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            ...user
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Login falure'
        })
    }
});

app.post('/auth/registration', registerValidation,  async (req, res) => {
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
        }, 'seretkey', {expiresIn: '7d'});

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
    
})

// app.put()
// app.delete()


// app.use()

// app.set()
// app.get()

app.listen('4444', (err) => {
    if (err) {
        console.error(err);
    }
    console.log('Server OK')
})