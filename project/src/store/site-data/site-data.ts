import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, FILMS_COUNT, DEFAULT_ACTIVE_GENRE} from '../../const';
import {SiteData} from '../../types/state';
import {fetchFilmsAction, fetchFilmAction, fetchSimilarFilmsAction, fetchPromoAction, postCommentAction} from './../api-actions';

const initialState: SiteData = {
  activeGenre: DEFAULT_ACTIVE_GENRE,
  films: [],
  filteredFilms: [],
  filmsCount: FILMS_COUNT,
  film: null,
  similarFilmsList: [],
  promo: null,
  filmComments: [],
  filmsList: [],
  isDataLoaded: true,
};

export const siteData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.filteredFilms = action.payload;
        state.isDataLoaded = true;
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
      });
  },
});
