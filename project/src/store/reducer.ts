import {createReducer} from '@reduxjs/toolkit';
import {setActiveGenre, getFilteredGenre, resetFilmsCount, increaseFilmsCount, loadFilms, loadFilm, loadPromo, requireAuthorization, setDataLoadedStatus, setAvatarUrl, loadSimilarFilms} from './action';
import {DEFAULT_ACTIVE_GENRE, FILMS_COUNT, AuthorizationStatus} from '../const';
import {Film} from '../types/films';
import {Review} from '../types/reviews';

type InitalState = {
  activeGenre: string;
  filteredFilms: Film[];
  filmsCount: number;
  films: Film[],
  film: Film | null,
  similarFilmsList: Film[],
  promo: Film | null,
  filmComments: Review[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  avatarUrl: string | null,
  filmsList: Film[],
}

const initialState: InitalState = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  films: [],
  filteredFilms: [],
  filmsCount: FILMS_COUNT,
  film: null,
  similarFilmsList: [],
  promo: null,
  filmComments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  avatarUrl: null,
  filmsList: [],
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
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilmsList = action.payload;
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
