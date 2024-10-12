/**
 * Node Modules
 */
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Login from './Login';
import Dashboard from './Dashboard';

const Home = ({ handleAlert }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('accessToken') ? true : false,
  );

  const removeTokenFromDatabase = async (accessToken) => {
    const tokenRemoveUrl = 'http://localhost:3000/v1/api/auth/access-token/store';

    await fetch(tokenRemoveUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: accessToken.split(' ')[1],
      }),
    });
  };

  const logoutUser = () => {
    removeTokenFromDatabase(localStorage.getItem('accessToken'));
    localStorage.removeItem('accessToken');

    /* Redirect to the homepage if a 'code' query parameter is present. This prevents errors from getGithubAccessFunction on re-renders due to state changes, ensuring stability. */
    window.location.href = '/';

    setIsAuthenticated(false);
  };

  return (
    <>
      <div className="mx-2 my-2 max-w-2xl bg-white shadow-sm h-full px-8 py-10 md:mx-auto">
        {!isAuthenticated && (
          <Login
            setIsAuthenticated={setIsAuthenticated}
            handleAlert={handleAlert}
          />
        )}

        {isAuthenticated && (
          <Dashboard
            logoutUser={logoutUser}
            handleAlert={handleAlert}
          />
        )}
      </div>
    </>
  );
};

Home.propTypes = {
  handleAlert: PropTypes.func,
};

export default Home;
