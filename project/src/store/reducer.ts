import {createReducer} from '@reduxjs/toolkit';
import {setActiveGenre, getFilteredGenre, resetFilmsCount, increaseFilmsCount, loadFilms, requireAuthorization} from './action';
import {DEFAULT_ACTIVE_GENRE, FILMS_COUNT, AuthorizationStatus} from '../const';
import {FILMS_DATA} from '../mocks/films';

const initialState = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  filteredFilms: FILMS_DATA,
  filmsCount: FILMS_COUNT,
  films: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(getFilteredGenre, (state) => {
      state.filteredFilms = state.activeGenre === DEFAULT_ACTIVE_GENRE ? FILMS_DATA : FILMS_DATA.filter((item) => item.genre === state.activeGenre);
    })
    .addCase(resetFilmsCount, (state) => {
      state.filmsCount = FILMS_COUNT;
    })
    .addCase(increaseFilmsCount, (state) => {
      state.filmsCount += FILMS_COUNT;
    })
    .addCase(loadFilms, (state, action) => {
      state.filteredFilms = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
