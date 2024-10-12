/**
 * Node modules
 */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

/**
 * Components
 */
import Repo from './Repo';
import Info from './Info';

const Dashboard = ({ logoutUser, handleAlert }) => {
  const [userDetails, setUserDetails] = useState(null);
  const ImpInfoPoints = [
    {
      id: 10,
      infoPoint: 'Kindly click on places shown above to get desired result',
    },
    {
      id: 11,
      infoPoint:
        'Your repository may have multiple webhooks created. No information about them is shown above thus only a option to create a webhook is given',
    },
  ];

  const saveTokenInDatabase = async (username) => {
    const tokenStoreUrl = 'http://localhost:3000/v1/api/auth/access-token/store';

    const response = await fetch(tokenStoreUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        accessToken: localStorage.getItem('accessToken').split(' ')[1],
      }),
    });
    const result = await response.json();

    if (result.message) {
      handleAlert(result.message);
    }
  };

  const fetchUserDetails = async () => {
    const url = 'https://api.github.com/user';

    const response = await fetch(url, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: localStorage.getItem('accessToken'),
      },
    });
    const result = await response.json();

    if (result.error) {
      handleAlert('Some error occurred while getting user details');
    }

    setUserDetails(result);

    // saving the access token in backend
    saveTokenInDatabase(result.login);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      {userDetails && (
        <div className="flex flex-col space-y-4 flex-grow w-full">
          <h1 className="heading">Automated PR Review System</h1>
          <div className="flex space-x-3">
            <div className="basis-1/12 flex flex-col justify-center">
              <figure className="overflow-hidden">
                <img
                  src={userDetails.avatar_url}
                  alt={userDetails.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </figure>
            </div>

            <div className="basis-1/3 flex flex-col justify-center items-start space-y-1">
              <h6 className="main-text">{userDetails.name}</h6>

              <a
                href={userDetails.html_url}
                className="links"
                target="_blank"
                rel="noreferrer"
              >
                Open Profile
              </a>
            </div>

            <div className="basis-1/2 flex justify-end">
              <button
                className="h-8 px-4 py-1 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 active:bg-red-800 transition-all duration-100"
                onClick={logoutUser}
              >
                Logout
              </button>
            </div>
          </div>

          <Repo
            owner={userDetails.login}
            total_repos={userDetails.public_repos + userDetails.total_private_repos}
            handleAlert={handleAlert}
          />
        </div>
      )}

      <Info infoArray={ImpInfoPoints} />
    </>
  );
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  handleAlert: PropTypes.func,
};

export default Dashboard;
