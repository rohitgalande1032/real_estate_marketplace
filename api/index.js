import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config()

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB!')    
})
.catch((err) => {
    console.log(err);
    
});

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.listen(3000, () => {
    console.log("Listen on port number 3000");
    
})