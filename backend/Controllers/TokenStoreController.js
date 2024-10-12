/**
 * User Defined Modules
 */
const TokenStore = require('../Models/TokenStore');
const logger = require('../Logger/logger');

const TokenStoreController = async (req, res) => {
  logger.info('Received the request from user to save access token in database', {
    endpoint: '/v1/api/auth/access-token/store',
    method: 'POST',
  });

  const { username, accessToken } = req.body;
  console.log(username, accessToken);

  logger.info('Storing access token in database', {
    endpoint: '/v1/api/auth/access-token/store',
    method: 'POST',
  });

  try {
    await TokenStore.findOneAndUpdate(
      { username: username },
      {
        username,
        accessToken,
      },
      { upsert: true },
    );
  } catch (error) {
    logger.error('Error while saving access token in database', {
      endpoint: '/v1/api/auth/access-token/store',
      method: 'POST',
      error: error.message,
    });

    return res.status(500).json({ message: 'Some Error Occurred While Saving Token' });
  }

  logger.info('Succesfully saved access token in database', {
    endpoint: '/v1/api/auth/access-token/store',
    method: 'POST',
  });

  return res.status(200).json({ success: true });
};

const TokenRemoveController = async (req, res) => {
  logger.info('Received the request from user to remove access token from database', {
    endpoint: '/v1/api/auth/access-token/store',
    method: 'DELETE',
  });

  const { accessToken } = req.body;

  logger.info('Deleting the access token from database', {
    endpoint: '/v1/api/auth/access-token/store',
    method: 'DELETE',
  });

  try {
    await TokenStore.findOneAndDelete({
      accessToken,
    });
  } catch (error) {
    logger.error('Error occurred while removing access token from database', {
      endpoint: '/v1/api/auth/access-token/store',
      method: 'DELETE',
      error: error.message,
    });

    return res.status(500).send();
  }

  logger.info('Removed access token from database', {
    endpoint: '/v1/api/auth/access-token/store',
    method: 'DELETE',
  });

  return res.status(200).send();
};

module.exports = {
  TokenStoreController,
  TokenRemoveController,
};
