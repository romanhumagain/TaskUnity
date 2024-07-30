const express = require('express')

const { 
  getAllTasks,
  getTasks,
  fetchTaskDetails,
  createTask, 
  updateTask, 
  deleteTask, 
  getPendingTasks,
  getCompletedTasks, 
  getOverdueTasks,
  getImportantTasks
} = require('../controllers/taskController')


const auth = require('../middlewares/authMiddlewares')
const router = express.Router()

router.get('/', auth, getTasks)
router.get('/all', auth, getAllTasks)

router.get('/completed-tasks', auth, getCompletedTasks)
router.get('/pending-tasks', auth, getPendingTasks)
router.get('/overdue-tasks', auth, getOverdueTasks)
router.get('/important-tasks', auth, getImportantTasks)

router.get('/:id', auth, fetchTaskDetails)
router.post('/', auth, createTask)
router.delete('/:id', auth, deleteTask)
router.put('/:id', auth, updateTask)

module.exports = router;
