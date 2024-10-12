/**
 * Node modules
 */
import PropTypes from 'prop-types';
import { useEffect } from 'react';

/**
 * Components
 */
import Info from './Info';

// Getting the environment variables in VITE
const envVar = import.meta.env;

const Login = ({ setIsAuthenticated, handleAlert }) => {
  const REDIRECT_URL = 'http://localhost:5173/';
  const SCOPE = 'user,repo';
  const BASE_AUTH_GITHUB_URL = 'https://github.com/login/oauth/authorize';
  const ImpPointsArray = [
    {
      id: 20,
      infoPoint: 'Click on above link to proceed with the authentication to github',
    },
    {
      id: 21,
      infoPoint:
        'For automating the PR Request you will have to stay loggedin. Although you can close the tab but should not do logout',
    },
  ];

  const performGithubLogin = () => {
    const queryParams = `?client_id=${envVar.VITE_CLIENT_ID}&redirect_url=${REDIRECT_URL}&scope=${SCOPE}`;

    window.location.assign(BASE_AUTH_GITHUB_URL + queryParams);
  };

  const getGithubCode = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const code = urlParams.get('code');

    return code;
  };

  const getGithubAccessToken = async () => {
    const githubCodeForAccessToken = getGithubCode();
    const url = 'http://localhost:3000/v1/api/auth/access-token';

    if (!githubCodeForAccessToken) {
      return;
    }

    // Sending request to backend to fetch the oauth token
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: githubCodeForAccessToken,
        redirectUri: REDIRECT_URL,
      }),
    });
    const result = await response.json();

    if (result.error) {
      handleAlert('Some error occurred at backend');
    } else {
      // storing the access token
      setIsAuthenticated(true);
      localStorage.setItem('accessToken', `bearer ${result.access_token}`);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      getGithubAccessToken();
    }
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {' '}
        <h1 className="heading">Welcome to Automated PR Review System</h1>
        <button
          className="self-center btn-primary mt-4"
          onClick={performGithubLogin}
        >
          Login With Github
        </button>
      </div>

      <Info infoArray={ImpPointsArray} />
    </>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  handleAlert: PropTypes.func,
};

export default Login;
