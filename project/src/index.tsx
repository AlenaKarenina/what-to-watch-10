import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {reviews} from './mocks/reviews';
import {store} from './store';
import ErrorMessage from './components/error-message/error-message';
import {fetchFilmsAction, checkAuthAction, fetchPromoAction} from './store/api-actions';

store.dispatch(fetchPromoAction());
store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage />
      <App reviews={reviews}/>
    </Provider>
  </React.StrictMode>,
);
