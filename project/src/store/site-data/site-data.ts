import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, FILMS_COUNT, DEFAULT_ACTIVE_GENRE} from '../../const';
import {SiteData} from '../../types/state';
import {fetchFilmsAction, fetchFilmAction, fetchSimilarFilmsAction, fetchPromoAction, postCommentAction, fetchFavoriteFilmsAction, changeFilmStatusAction} from './../api-actions';
import {setActiveGenre, getFilteredGenre, resetFilmsCount, increaseFilmsCount} from '../action';

const initialState: SiteData = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  films: [],
  filteredFilms: [],
  filmsCount: FILMS_COUNT,
  film: null,
  similarFilmsList: [],
  promo: null,
  filmComments: [],
  isDataLoaded: false,
  favoriteFilmsList: [],
  isFavoriteStatusChanged: false,
};

export const siteData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    resetFavoriteStatus: (state, action) => {
      state.isFavoriteStatusChanged = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.filteredFilms = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilmsList = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(postCommentAction.fulfilled, (state) => {
        state.isDataLoaded = false;
      })
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
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilmsList = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(changeFilmStatusAction.pending, (state) => {
        state.isFavoriteStatusChanged = false;
      })
      .addCase(changeFilmStatusAction.fulfilled, (state) => {
        state.isFavoriteStatusChanged = true;
      });
  },
});

export const {resetFavoriteStatus} = siteData.actions;
