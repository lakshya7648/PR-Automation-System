/**
 * Node modules
 */
import PropTypes from 'prop-types';

const Info = ({ infoArray }) => {
  return (
    <>
      <div className="mt-8 px-8 py-6 bg-red-100/40 border border-red-300 rounded-lg">
        <h4 className="text-sm text-red-500 font-bold mb-3">
          Important information read before proceeding
        </h4>
        <ul className="list-inside list-disc ml-4">
          {infoArray &&
            infoArray.map(({ id, infoPoint }) => {
              return (
                <li
                  className="text-xs text-red-400 font-semibold my-2"
                  key={id}
                >
                  {infoPoint}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

Info.propTypes = {
  infoArray: PropTypes.array.isRequired,
};

export default Info;
