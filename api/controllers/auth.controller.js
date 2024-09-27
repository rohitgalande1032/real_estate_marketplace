import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next)=> {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password)
    const newUser = new User({username, email, password: hashedPassword})
    try {
        await newUser.save()
        res.status(201).json("User Created Successfully")
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404,'Invalid Credentials!'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, 'Invalid Credentials!'))
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const {password: pass, ...rest} = validUser._doc     //Do not send password, send data except password, because pass dont get leak
        res.cookie('access_token', token, {httpOnly: true})
        .status(200)
        .json(rest)
    } catch (error) {
        next(error)
    }
}