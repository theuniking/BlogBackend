const express = require('express')
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const {sign} = require('../token');

const router = express.Router()


const User = mongoose.model('User');

router.post('/signup',async (req,res) => {
    const {login,password} = req.body
    const user = new User({login,password_hash:bcrypt.hashSync(password,3)})
    console.table({password,passwordHash: bcrypt.hashSync(password,3)})
    try {
        await user.save()
        const token = sign({userId:user._id}) //signing jwt
        res.send({token})
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/login',async (req,res) => {
    const {login,password} = req.body
    const user = await User.findOne({login})
    if(!user) {
        return res.status(422).send({message:"user does not exist"})
    }
    if(bcrypt.compareSync(password,user.password_hash)) {
        const token = sign({userId:user._id}) //signing jwt

        return res.send({token})
    }
    res.status(400).send({message:'password is incorrect'})
})

module.exports = router