const express = require('express')
const {getTasks, createTask,updateTask, deleteTask} = require('../controllers/taskController')

const router = express.Router()

router.get('/', getTasks)
router.post('/', createTask)
router.delete('/:id', deleteTask)
router.put('/:id', updateTask)

module.exports = router
