import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import AppGame from './Game';

interface AppProps {
  store: any;
}

function App(props: AppProps) {
  const { store } = props;
  return (
    <Provider store={store}>
      <AppGame />
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.any.isRequired,
};

export default App;
