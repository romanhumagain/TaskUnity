const express = require('express')
const {get_user, register_user} = require('../controllers/userController')

const router = express.Router();

router.get('/get-users', get_user)
router.post('/register-user', register_user)

module.exports = router;

