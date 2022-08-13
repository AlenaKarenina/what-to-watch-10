import {createReducer} from '@reduxjs/toolkit';
import {setActiveGenre, getFilteredGenre, resetFilmsCount, increaseFilmsCount, loadFilms, loadPromo, requireAuthorization, setDataLoadedStatus, setAvatarUrl} from './action';
import {DEFAULT_ACTIVE_GENRE, FILMS_COUNT, AuthorizationStatus} from '../const';
import {Film} from '../types/films';

type InitalState = {
  activeGenre: string;
  filteredFilms: Film[];
  filmsCount: number;
  films: Film[],
  promo: Film | null,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  avatarUrl: string | null,
}

const initialState: InitalState = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  films: [],
  filteredFilms: [],
  filmsCount: FILMS_COUNT,
  promo: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  avatarUrl: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(getFilteredGenre, (state) => {
      state.filteredFilms = state.activeGenre === DEFAULT_ACTIVE_GENRE ? state.films : state.films.filter((item) => item.genre === state.activeGenre);
    })
    .addCase(resetFilmsCount, (state) => {
      state.filmsCount = FILMS_COUNT;
    })
    .addCase(increaseFilmsCount, (state) => {
      state.filmsCount += FILMS_COUNT;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.filteredFilms = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setAvatarUrl, (state, action) => {
      state.avatarUrl = action.payload;
    });
});

export {reducer};
