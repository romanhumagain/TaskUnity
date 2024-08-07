const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { profileImage } = require('../middlewares/uploadMiddleware');
const auth = require('../middlewares/authMiddlewares');

router.get('/', auth, profileController.getProfileDetails);
router.put('/update', auth, profileImage.single('profileImage'), profileController.update_profile);
router.get('/:user_id/:workspace_id', auth, profileController.fetch_specific_user_profile);


module.exports = router;
