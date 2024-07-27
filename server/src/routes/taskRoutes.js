const express = require('express')
const { getTasks,fetchTaskDetails, createTask, updateTask, deleteTask } = require('../controllers/taskController')
const auth = require('../middlewares/authMiddlewares')
const router = express.Router()

router.get('/', auth, getTasks)
router.get('/:id', auth, fetchTaskDetails)

router.post('/', auth, createTask)
router.delete('/:id', auth, deleteTask)
router.put('/:id', auth, updateTask)

module.exports = router
