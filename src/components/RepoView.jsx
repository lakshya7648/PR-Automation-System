/**
 * Node Modules
 */
import PropTypes from 'prop-types';

const RepoView = ({ name, html_url, owner, handleAlert }) => {
  const createWebhook = async () => {
    const url = `https://api.github.com/repos/${owner}/${name}/hooks`;
    const payloadDeliveryUrl = import.meta.env.VITE_WEBHOOK_BACKEND_DELIVERY_URL;

    await fetch(url, {
      method: 'POST',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        config: {
          url: payloadDeliveryUrl,
          content_type: 'json',
          secret: import.meta.env.VITE_HOOKS_CREATION_SECRET,
        },
        events: ['pull_request'],
      }),
    });

    handleAlert('Webhook created successfully!');
  };

  return (
    <>
      <div className="grid grid-cols-3 space-y-2 mb-6 hover:bg-blue-50 border rounded-md hover:border hover:border-blue-200 px-4 py-2 cursor-pointer">
        <h5 className="main-text col-span-3">{name}</h5>

        <a
          href={html_url}
          className="links flex items-center"
          target="_blank"
          rel="noreferrer"
        >
          View Repository
        </a>

        <div className="col-span-2 flex justify-end">
          <button
            className="btn-secondary flex items-center justify-center"
            onClick={createWebhook}
          >
            Create Webhook
          </button>
        </div>
      </div>
    </>
  );
};

RepoView.propTypes = {
  name: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  handleAlert: PropTypes.func,
};

export default RepoView;
