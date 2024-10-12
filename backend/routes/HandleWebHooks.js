/**
 * Node Modules
 */
const express = require('express');

/**
 * User Defined Modules
 */
const webHookPrController = require('../Controllers/WebHookPRController');

router = express.Router();

router.post('/pr-data', webHookPrController);

module.exports = router;
