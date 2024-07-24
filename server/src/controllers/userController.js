const User = require('../models/userModels')

exports.get_user = async(req, res)=>{
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

exports.register_user = async (req,res)=>{
  try {
    const {first_name, last_name, username, email, password,profilePicture } = req.body;
    const existing_user = await User.findOne({email:email})

    if(existing_user){
      return res.status(400).json({message:'user already exists, please use another email !'})
    }

    const user = new User({first_name, last_name, username, email, password,profilePicture});
    await user.save();

    res.status(201).json(user);
    
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}