const express = require('express')
const {get_notification, get_unread_notification, mark_notification_read, send_notification} = require('../controllers/notificationController')
const auth = require('../middlewares/authMiddlewares')
const { route } = require('./userRoutes')
const router = express.Router()

router.get('/',auth, get_notification )
router.get('/unread', auth, get_unread_notification)
router.put('/mark-read',auth, mark_notification_read)
router.post('/', auth, send_notification)

module.exports = router