import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {FILMS_DATA} from './mocks/films';
import {reviews} from './mocks/reviews';
import {store} from './store';

const AppProps = {
  filmPromo: {
    name: 'The Grand Budapest Hotel',
    genre: 'Drama',
    released: 2014,
  },
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        filmPromo={AppProps.filmPromo}
        films={FILMS_DATA}
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>,
);
