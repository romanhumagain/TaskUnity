const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddlewares')

const {
  read_workspace_message,
  read_workspace_task_message,
  send_message_to_workspace,
  send_message_to_workspace_task, 
  get_unread_message, 
  addMessageReader } = require('../controllers/workspaceMessageController')

router.get('/:workspace_id', auth, read_workspace_message)
router.get('/unread/:workspace_id', auth, get_unread_message)
router.put('/mark_read/:workspace_id', auth, addMessageReader)
router.post('/:workspace_id', auth, send_message_to_workspace)
router.get('/task/:workspace_id/:task_id', auth, read_workspace_task_message)
router.post('/task/:workspace_id/:task_id', auth, send_message_to_workspace_task)

module.exports = router;
