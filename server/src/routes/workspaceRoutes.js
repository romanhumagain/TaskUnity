const express = require('express')
const router = express.Router()

const {
  get_workspace,
  create_workspace,
  get_workspace_details,
  invite_users,
  verify_invited_user,
  add_membership,
  get_workspace_users,
  remove_invitation,
  delete_workspace,
  verify_workspace } = require('../controllers/workspaceController')

const auth = require('../middlewares/authMiddlewares')

router.get('/', auth, get_workspace)
router.get('/:id', auth, get_workspace_details)
router.post('/', auth, create_workspace)
router.post('/invite_users', auth, invite_users)
router.post('/verify_invited_user', auth, verify_invited_user)
router.post('/add_workspace_member', auth, add_membership)
router.get('/member/:workspace_id', auth, get_workspace_users)
router.delete('/:id', auth, remove_invitation)
router.delete('/delete/:workspace_id', auth, delete_workspace)
router.get('/verify/:workspace_id', auth, verify_workspace)


module.exports = router;