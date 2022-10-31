import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './rootReducer';
let middlewares = [thunkMiddleware];

const composeEnhancers =
  module.hot && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const configureStore = (predefinedState) => {
  return createStore(
    rootReducer,
    predefinedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};

export default configureStore;
