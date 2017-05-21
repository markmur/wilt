import React from 'react';
import ReactDOM from 'react-dom';
import Wilt from 'Wilt';
import styles from 'styles/app.scss';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import reducers from 'reducers';

const middleware = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger({ collapsed: true }));
}

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <Wilt />
  </Provider>,
  document.getElementById('Wilt')
);
