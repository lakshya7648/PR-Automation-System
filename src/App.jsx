/**
 * Node modules
 */
import { useState } from 'react';

/**
 * Components
 */
import Home from './components/Home';
import Alert from './components/Alert';

function App() {
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: 'Alert Message',
  });

  const handleAlert = (message) => {
    setShowAlert({
      show: true,
      message,
    });

    // Set a timeout to hide the alert after 5 seconds
    setTimeout(() => {
      setShowAlert({
        show: false,
        type: 'info',
        message: 'Alert Message',
      });
    }, 5000);
  };

  return (
    <>
      <Alert
        showAlert={showAlert.show}
        message={showAlert.message}
      />
      <Home handleAlert={handleAlert} />
    </>
  );
}

export default App;
