import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, loginValidation, postValidation } from './validations/validation.js';
import checkUser from './utils/checkUser.js';
import * as UserController from './controllers/userController.js';
import * as PostController from './controllers/postController.js';

const app = express();
app.use(express.json());

mongoose
.connect('mongodb+srv://admin:12345@cluster0.oyurklw.mongodb.net/blogdb?retryWrites=true&w=majority')
.then(console.log('DB is OK'))
.catch((err) => console.log('DB is NOT OK', err))

app.get('/', (req, res) => {
    res.send('Hello world')
});
app.post('/auth/login', loginValidation, UserController.login);

app.post('/auth/registration', registerValidation,  UserController.registration);

app.get('/auth/profile', checkUser, UserController.profile);

app.post('/posts/create', checkUser, postValidation, PostController.create);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.patch('/posts/:id', checkUser, PostController.update);



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