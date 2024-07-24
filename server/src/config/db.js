const mongoose = require('mongoose')

require('dotenv').config()
const DB_URI = process.env.DB_URI

const connect_db = async () => {
  try {
    await mongoose.connect(DB_URI)
    console.log("Mongo DB connected successfully !")
  } catch (error) {
    console.log(error)
  }
}

module.exports = connect_db