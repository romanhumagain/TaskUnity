const express = require('express')
const {get_user, register_user, login_user, get_user_details} = require('../controllers/userController')

const router = express.Router();

router.get('/get-users', get_user)
router.post('/register-user', register_user)
router.post('/login-user', login_user)
router.get('/user-details/:id', get_user_details)

module.exports = router;

