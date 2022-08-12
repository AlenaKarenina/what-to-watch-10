import {createAction} from '@reduxjs/toolkit';
import {Film} from '../types/films';
import {AppRoute, AuthorizationStatus} from '../const';

export const setActiveGenre = createAction<string>('setActiveGenre');

export const getFilteredGenre = createAction('films/getFilteredGenre');

export const resetFilmsCount = createAction('films/resetFilmsCount');

export const increaseFilmsCount = createAction('films/increaseFilmsCount');

export const loadFilms = createAction<Film[]>('data/loadFilms');

export const loadPromo = createAction<Film>('data/loadPromo');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('films/setError');

export const redirectToRoute = createAction<AppRoute>('site/redirectToRoute');
