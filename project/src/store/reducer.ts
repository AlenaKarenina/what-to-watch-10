import {createReducer} from '@reduxjs/toolkit';
import {setActiveGenre, getFilteredGenre} from './action';
import {DEFAULT_ACTIVE_GENRE} from '../const';
import {FILMS_DATA} from '../mocks/films';

const initialState = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  filteredFilms: FILMS_DATA,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(getFilteredGenre, (state) => {
      state.filteredFilms = state.activeGenre === DEFAULT_ACTIVE_GENRE ? FILMS_DATA : FILMS_DATA.filter((item) => item.genre === state.activeGenre);
    });
});

export {reducer};
