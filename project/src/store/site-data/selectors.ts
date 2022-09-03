import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Film} from '../../types/films';

export const getFilms = (state: State): Film[] => state[NameSpace.Data].films;
export const getFilm = (state: State): Film | null => state[NameSpace.Data].film;
export const getSimilarFilmsList = (state: State): Film[] => state[NameSpace.Data].similarFilmsList;
export const getPromoFilm = (state: State): Film | null => state[NameSpace.Data].promo;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getGenre = (state: State): string => state[NameSpace.Data].activeGenre;
export const getFilmsCount = (state: State): number => state[NameSpace.Data].filmsCount;
export const getFilteredFilms = (state: State): Film[] => state[NameSpace.Data].filteredFilms;
export const getFavoriteFilms = (state: State) => state[NameSpace.Data].favoriteFilmsList;
export const getFavoriteStatusChange = (state: State) => state[NameSpace.Data].isFavoriteStatusChanged;
