import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';

// @ts-ignore: unused import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faInfoCircle,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';

import App from './App';
import store from './store/createStore';

import './styles/index.scss';

import { schemaUris } from './config';
import { fetchSchema } from './store/modules/schemas';

const icons = [faInfoCircle, faSortDown, faSortUp];

library.add(...icons);

schemaUris.forEach((uri: string) => {
  fetchSchema(uri)(store.dispatch);
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.root')
);
