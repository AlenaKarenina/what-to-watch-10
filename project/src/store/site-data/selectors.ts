import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Film} from '../../types/films';

export const getFilms = (state: State): Film[] => state[NameSpace.Data].filmsList;
export const getFilm = (state: State): Film | null => state[NameSpace.Data].film;
export const getSimilarFilmsList = (state: State): Film[] => state[NameSpace.Data].similarFilmsList;
export const getPromoFilm = (state: State): Film | null => state[NameSpace.Data].promo;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
