const router = require('express').Router();
const settingsController = require('../controllers/settingsController');
const verifyAuth = require('../controllers/verifyAuthController');

router.get('/settings', verifyAuth, settingsController.settingsGet);

module.exports = router;
