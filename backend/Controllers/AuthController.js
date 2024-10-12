/**
 * User defined Modules
 */
const logger = require('../Logger/logger');

const ENDPOINT = '/v1/api/auth/access-token',
  METHOD = 'POST';

const AuthController = async (req, res) => {
  logger.info('Received request to fetch the user access token!', {
    endpoint: ENDPOINT,
    method: METHOD,
  });

  const codeForGithubAccessToken = req.body.code;
  const redirect_uri = req.body.redirectUri;
  const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';

  if (!codeForGithubAccessToken) {
    return res.status(500).json({ message: "code for github access didn't provide correctly!" });
  }

  logger.info('Fetching access token on the basis of code provided!', {
    endpoint: ENDPOINT,
    method: METHOD,
  });

  const response = await fetch(ACCESS_TOKEN_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: codeForGithubAccessToken,
      redirect_uri: redirect_uri,
    }),
  });
  const result = await response.json();

  if (result.error) {
    logger.error('Error while fetching access token', {
      error: result.error.message,
      endpoint: ENDPOINT,
      method: METHOD,
    });
    return res.status(400).send({ result });
  }

  logger.info('Access Token Fetched Successfully and response sent', {
    endpoint: ENDPOINT,
    method: METHOD,
    METHOD,
  });

  return res.status(200).send(result);
};

module.exports = AuthController;
