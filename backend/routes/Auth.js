/**
 * Node Modules
 */
const express = require('express');

/**
 * User Defined Modules
 */
const AuthController = require('../Controllers/AuthController');
const {
  TokenStoreController,
  TokenRemoveController,
} = require('../Controllers/TokenStoreController');

router = express.Router();

router.post('/access-token', AuthController);
router.post('/access-token/store', TokenStoreController);
router.delete('/access-token/store', TokenRemoveController);

module.exports = router;
