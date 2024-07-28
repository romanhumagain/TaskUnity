const User = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

require('dotenv').config()

const get_user = async(req, res)=>{
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const register_user = async (req,res)=>{
  try {
    const {full_name, username, email, password } = req.body;
    const existing_user = await User.findOne({email:email})

    if(existing_user){
      return res.status(400).json({message:'user already exists, please use another email !'})
    }

    const user = new User({full_name, username, email, password});
    await user.save();

    res.status(201).json(user);
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}


const login_user = async (req, res)=>{
  try {
    const {email, password} = req.body
    const user =  await User.findOne({email:email})

    if(!user){
      return res.status(401).json({message:'Invalid Email !'})
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if(!isPasswordMatched){
      return res.status(401).json({message:'Invalid Password !'})
    }

    const payload = {
      user:{
        _id:user.id,
      }
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn:'8h'},
      (error, token)=>{
        if(error) throw error;
        res.status(200).json({'message':'Successfully Logged in',token});
      }
    )
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  get_user, 
  register_user, 
  login_user
}