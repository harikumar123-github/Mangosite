import express from "express";
import User from "../models/usermodel.js";
import { users } from "../users.js";
import  expressAsyncHandler from 'express-async-handler'
import bcrypt from "bcryptjs";
import { generateToken, isAuth, isAdmin } from "../utils.js";

const userRouter = express.Router()

userRouter.get('/seed', expressAsyncHandler(  async (req,res) => {
    
    const createdUsers = await User.insertMany(users)
    res.send({ createdUsers });

}) )

userRouter.post('/signin', expressAsyncHandler(async (req,res) => {
    const user = await User.findOne({ email: req.body.email })
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                token: generateToken(user)
            })
            return;
        }
    }
    res.status(401).send({ message:'Invalid username/password' })
}))

userRouter.post( '/register' , expressAsyncHandler( async (req, res) => {
    const user = new User({name: req.body.name, email: req.body.email, password: bcrypt.hashSync( req.body.password,10) })

    const newUser = await user.save()

    res.send(  {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(newUser)
    } )
    
} ) )


userRouter.get('/:id', expressAsyncHandler( async (req,res) => {
    const user = await User.findById(req.params.id)

    if(user){
        res.send(user)
    }
    else{
        res.status(404).send({ message: 'User not found'})
    }

} ))

userRouter.put('/profile', isAuth , expressAsyncHandler ( async (req,res) => {
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password,10)
        }
        const updatedUser = await user.save()
        res.send( {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: updatedUser.isSeller,
            token: generateToken(updatedUser),
        } )
    }
} ))

userRouter.get('/', isAuth, isAdmin , expressAsyncHandler( async (req,res) => {
    const users = await User.find({})
    res.send(users)
} ) )

userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user.isAdmin){
        res.status(400).send({ message: 'Cannot delete admin' })
        return;
    }
    
    if(user){
        const deletedUser = await user.remove()
        res.send( { message: 'User deleted', user: deletedUser } )
    }
    else{
        res.status(404).send({ message: 'User not found' })
    }
} ))


userRouter.put( '/:id', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isSeller = req.body.isSeller
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.send({ message: 'User updated' , user: updatedUser })
    }
    else{
        res.status(404).send( { message: 'User not found' } )
    }

} ) )


export default userRouter
