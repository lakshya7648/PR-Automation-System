/**
 * User Defined Modules
 */
const verifySignature = require('../Verification/SignatureVerifier');
const GetPRReview = require('../AIIntegration/GetPRReview');
const TokenStore = require('../Models/TokenStore');
const logger = require('../Logger/logger');

const ENDPOINT = '/v1/api/hooks',
  METHOD = 'POST';

const webHookPrController = async (req, res) => {
  if (req.body.zen) {
    logger.info('Received a webhook event ping on creation of webhook', {
      endpoint: ENDPOINT,
      method: METHOD,
      hookId: req.hook_id,
    });

    return res.status(200).json({ message: 'Received Ping Successfully!' });
  }

  logger.info('Received a webhook event to process the payload and sent automated response', {
    endpoint: ENDPOINT,
    method: METHOD,
  });

  const signature = req.headers['x-hub-signature-256'];
  const payload = req.body;

  logger.info('Got the webhook payload and verifying validated webhook delivery from github', {
    endpoint: ENDPOINT,
    method: METHOD,
  });

  /* --------- Validating Web Hook Delivery --------- */
  try {
    await verifySignature(process.env.WEBHOOK_SECRET, signature, payload);

    logger.info(
      'Signature verified, received webhook payload is from validated github webhook delivery',
      {
        endpoint: ENDPOINT,
        method: METHOD,
      },
    );
  } catch (error) {
    logger.error('Error occurred while verifying the signature of Webhook Payload', {
      endpoint: ENDPOINT,
      method: METHOD,
      error: error.message,
    });

    return res.status(400).send('Not a valid Github Triggered Webhook');
  }
  /************************************************ */

  logger.info("Fetching received pull request's data to get it verified from AI Model", {
    endpoint: ENDPOINT,
    method: METHOD,
    pullRequestNumber: payload.pull_request.number,
    repoName: payload.repository.name,
  });

  /* -------------- Getting PR Data ----------------- */
  const owner = payload.repository.owner.login;
  const prDataUrl = payload.pull_request.diff_url; // diff_url will give the changed data

  // fetching the auth token related to the user
  let accessToken;
  try {
    const user = await TokenStore.findOne({ username: owner });
    accessToken = user.accessToken;

    logger.info('Successfully fetched the access token from database', {
      endpoint: ENDPOINT,
      method: METHOD,
    });
  } catch (error) {
    logger.error('Error while fetching access token of required user', {
      endpoint: ENDPOINT,
      method: METHOD,
      error: error.message,
    });

    return res.status(500).json({ message: 'could not fetch the user' });
  }

  const response = await fetch(prDataUrl, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  const prData = await response.text();

  logger.info("Fetched the Pull request's data successfully and sending for AI Review", {
    endpoint: ENDPOINT,
    method: METHOD,
    pullRequestNumber: payload.pull_request.number,
    repoName: payload.repository.name,
  });

  /********************************************* */

  /* ------------ Getting AI review on the PRData ----------------- */
  logger.info('Revewing the pr data', {
    endpoint: ENDPOINT,
    method: METHOD,
  });

  const REVIEW_INSTRUCTION =
    'Review this pull request on the basis of Review Criteria:  Code Quality: Assess the overall readability and maintainability of the code. Are there any complex or unclear sections that could be simplified? Best Practices: Check for adherence to coding standards and conventions relevant to the project. Are there any anti-patterns or code smells present? Functionality: Evaluate whether the new changes meet the intended functionality as described. Are there any logical errors or missing edge cases? Performance: Identify any potential performance issues or inefficiencies in the code. Testing: Check if appropriate unit tests or integration tests are included. Are the tests comprehensive enough to cover different scenarios? Documentation: Ensure that any new code is well-documented. Are there comments explaining complex logic, and is there any relevant documentation updated? Security: Identify any potential security vulnerabilities introduced by the changes. Are there any considerations for input validation and error handling? Additional Instructions: Provide specific feedback on critical areas or potential bugs. Suggest improvements where applicable. Highlight any major changes that may affect other parts of the codebase. If applicable, comment on the impact of this PR on existing functionality or areas that may require further attention in future PRs.';
  const review = await GetPRReview(REVIEW_INSTRUCTION + prData);

  if (review.error) {
    logger.error('Error in Revewing the pr data', {
      endpoint: ENDPOINT,
      method: METHOD,
      error: review.error.message,
    });

    return res.status(400).send('Some Error Occurred!');
  }

  logger.info('Reviewed PR Data Successfully! and Posting the review as comment', {
    endpoint: ENDPOINT,
    method: METHOD,
  });
  /* ****************************************************** */

  /*---- Putting review as the comment on github using github api --------- */
  logger.info('Posting the review as comment', {
    endpoint: ENDPOINT,
    method: METHOD,
  });

  const commentIssueUrl = payload.pull_request.comments_url;

  await fetch(commentIssueUrl, {
    method: 'POST',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify({
      body: review,
    }),
  });

  logger.info('comment posted successfully!', {
    endpoint: ENDPOINT,
    method: METHOD,
  });
  /************************************************************** */

  logger.info('Successfully processed the request and took appropriate steps', {
    endpoint: ENDPOINT,
    method: METHOD,
    prDataFetched: true,
    AIReviewDone: true,
    commentPosted: true,
  });

  return res.status(200).send({ success: true });
};

module.exports = webHookPrController;
