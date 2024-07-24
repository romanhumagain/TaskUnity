const express = require('express');
const router = require('./src/routes/userRoutes')
const dotenv = require('dotenv')
const connect_db = require('./src/config/db')

require('dotenv').config()
const PORT = process.env.PORT || 3000

connect_db();

const app = express();
app.use(express.json());

// Creating Routes
app.use('/api', require('./src/routes/userRoutes'));

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})
