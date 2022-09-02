import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';

export const redirectToRoute = createAction<AppRoute>('site/redirectToRoute');

export const postComment = createAction('data/postComment', (value) => ({payload: value}));

export const setActiveGenre = createAction<string>('setActiveGenre');

export const getFilteredGenre = createAction('films/getFilteredGenre');

export const resetFilmsCount = createAction('films/resetFilmsCount');

export const increaseFilmsCount = createAction('films/increaseFilmsCount');

export const changeFilmStatus = createAction('data/changeFilmStatus', (value) => ({payload: value}));
