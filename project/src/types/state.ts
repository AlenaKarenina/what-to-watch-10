import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import {Film} from '../types/films';
import {Review} from '../types/reviews';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type SiteData = {
  film: Film | null,
  similarFilmsList: Film[],
  promo: Film | null,
  isDataLoaded: boolean,
  films: Film[],
  filteredFilms: Film[],
  filmsCount: number,
  filmComments: Review[],
  activeGenre: string,
  favoriteFilmsList: Film[],
  isFavoriteStatusChanged: boolean,
}

export type SiteProcess = {
  avatarUrl: string | null,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
