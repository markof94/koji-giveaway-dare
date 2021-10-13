/**
 * common/index.js
 *
 * What it Does:
 *   This file sets up our react app to render inside of the root html
 *   file. The global css file is included here as well as our service
 *   worker is registered.
 *
 * Things to Change:
 *   Anything outside of react that needs to be included in your project
 *   can go here. If you want additional CSS files you can include them
 *   here.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import Koji from '@withkoji/core';
import smoothscroll from 'smoothscroll-polyfill';
import configureStore from './store/utils/configureStore';
import Router from './router';

// Import our configuration file (will automatically be parsed from json)
import kojiConfig from '../../koji.json';

smoothscroll.polyfill();

const placeholderProfilePicture = 'https://images.koji-cdn.com/4e6a3fb0-74bc-416a-bdb5-b00e3caf96b6/userData/8w5cw-IMG_20210518_175147_247.jpg';

Koji.config(kojiConfig, {
  projectId: process.env.REACT_APP_PROJECT_ID,
  metadata: {
    creatorUsername: process.env.REACT_APP_CREATOR_USERNAME || 'Svarog1389',
    creatorProfilePicture: process.env.REACT_APP_CREATOR_PROFILE_PICTURE || placeholderProfilePicture,
  },
  services: {
    backend: process.env.REACT_APP_BACKEND_URL,
    frontend: process.env.REACT_APP_FRONTEND_URL,
  },
});

// Configure the redux store using the app's remixData
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
