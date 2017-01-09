import React from 'react';
import ReactDOM from 'react-dom';
import Wilt from 'Wilt';
import styles from 'styles/app.scss';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import reducers from 'reducers';

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Wilt />
  </Provider>,
  document.getElementById('Wilt')
);
