import {createReducer} from '@reduxjs/toolkit';
import {setActiveGenre, getFilteredGenre, resetFilmsCount} from './action';
import {DEFAULT_ACTIVE_GENRE, FILMS_COUNT} from '../const';
import {FILMS_DATA} from '../mocks/films';

const initialState = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  filteredFilms: FILMS_DATA,
  filmsCount: FILMS_COUNT,
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
    });
});

export {reducer};