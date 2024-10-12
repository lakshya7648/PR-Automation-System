/**
 * Node Modules
 */
import PropTypes from 'prop-types';

const Alert = ({ showAlert, message }) => {
  return (
    <>
      {showAlert && (
        <div
          className={`absolute z-10 top-8 right-1/2 px-8 py-4 bg-yellow-50 border border-yellow-300 rounded-md transition-all`}
        >
          <h6 className={`text-sm text-yellow-300 font-bold mb-2`}>Alert</h6>

          <p className={`text-xs text-yellow-300 font-normal`}>{message}</p>
        </div>
      )}
    </>
  );
};

Alert.propTypes = {
  showAlert: PropTypes.bool,
  message: PropTypes.string,
};

export default Alert;
