/**
 * Node modules
 */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

/**
 * Components
 */
import RepoView from './RepoView';

const Repo = ({ owner, total_repos, handleAlert }) => {
  const [userReposDetails, setUserReposDetails] = useState(null);
  const [page, setPage] = useState(1);
  const total_pages = Math.ceil(total_repos / 3);

  const fetchUserRepos = async () => {
    const url = `https://api.github.com/user/repos?per_page=3&page=${page}`;

    const response = await fetch(url, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: localStorage.getItem('accessToken'),
      },
    });
    const result = await response.json();

    setUserReposDetails(result);
  };

  useEffect(() => {
    fetchUserRepos();
  }, [page]);

  return (
    <>
      <div className="w-full my-10 flex flex-col">
        <h5 className="heading-2">Repositories</h5>
        {userReposDetails &&
          userReposDetails.map(({ id, name, html_url }) => {
            return (
              <RepoView
                key={id}
                name={name}
                html_url={html_url}
                owner={owner}
                handleAlert={handleAlert}
              />
            );
          })}

        <div className="flex justify-between p-2 mt-4">
          <button
            className="btn-primary"
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page == 1}
          >
            Prev
          </button>
          <button
            className="btn-primary"
            onClick={() => setPage(page <= total_pages ? page + 1 : page)}
            disabled={page == total_pages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

Repo.propTypes = {
  owner: PropTypes.string.isRequired,
  total_repos: PropTypes.number.isRequired,
  handleAlert: PropTypes.func,
};

export default Repo;
