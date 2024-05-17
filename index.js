import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

mongoose
.connect('mongodb+srv://admin:12345@cluster0.oyurklw.mongodb.net/')
.then(console.log('DB is OK'))
.catch((err) => console.log('DB is NOT OK', err))

app.get('/', (req, res) => {
    res.send('Hello world')
});
app.post('/auth/login', (req, res) => {
    console.log(req.body)
    res.json({
        login: "true"
    })
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