const express = require('express');
const router = require('./src/routes/userRoutes')
const dotenv = require('dotenv')
const connect_db = require('./src/config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

dotenv.config()
const PORT = process.env.PORT || 3000

connect_db();

const app = express();
app.use(bodyParser.json());
app.use(cors())

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Creating Routes
app.use('/api', require('./src/routes/userRoutes'));
app.use('/api/tasks', require('./src/routes/taskRoutes'));
app.use('/api/profile', require('./src/routes/profileRoutes'))
app.use('/api/workspace',require('./src/routes/workspaceRoutes'))
app.use('/api/notification', require('./src/routes/notificationRoutes'))
app.use('/api/workspace/task',require('./src/routes/workspaceTaskRoutes'))
app.use('/api/workspace/message',require('./src/routes/workspaceMessageRoutes'))
app.use('/api/workspace/task/activity',require('./src/routes/workspaceTaskActivityRoutes'))




app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})
