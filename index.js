const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routers/users');
const postRouter = require('./routers/posts');
const errorHandler = require('./middlewares/errorHandler');


require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use(errorHandler);
app.use(cors());


const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
    mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`).then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log('Not Connected to MongoDB')
        console.log(err)
    });
    console.log('Server is running on Port:3000');
});