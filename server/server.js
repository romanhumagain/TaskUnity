const express = require('express');
const router = require('./src/routes/userRoutes')
const dotenv = require('dotenv')
const connect_db = require('./src/config/db')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT || 3000

connect_db();

const app = express();
app.use(bodyParser.json());
app.use(cors())

// Creating Routes
app.use('/api', require('./src/routes/userRoutes'));
app.use('/api/tasks', require('./src/routes/taskRoutes'));

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})
