const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddlewares')

const {read_activity_message, send_activity_message} = require('../controllers/WorkspaceTaskActivityController')

router.get('/:workspace_id/:task_id', auth, read_activity_message )
router.post('/:workspace_id/:task_id', auth, send_activity_message )

module.exports = router;

