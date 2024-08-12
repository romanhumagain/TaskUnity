const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddlewares')
const {
  add_workspace_task,
  get_workspace_task,
  get_workspace_task_details,
  update_workspace_task,
  delete_workspace_task
} = require('../controllers/workspaceTaskController')

router.get('/:workspace_id', auth, get_workspace_task);
router.get('/:workspace_id/:task_id', auth, get_workspace_task_details);
router.post('/:workspace_id', auth, add_workspace_task);
router.put('/:task_id', auth, update_workspace_task);
router.delete('/:task_id', auth, delete_workspace_task);

module.exports = router;