import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {store} from './store';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {checkAuthAction} from './store/api-actions';
import { getToken } from './services/token';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

if(getToken()) {
  store.dispatch(checkAuthAction());
}

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
