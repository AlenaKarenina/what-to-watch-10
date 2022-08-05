import {createAction} from '@reduxjs/toolkit';
import {Films} from '../types/films';
import {AuthorizationStatus} from '../const';

export const setActiveGenre = createAction<string>('setActiveGenre');

export const getFilteredGenre = createAction('films/getFilteredGenre');

export const resetFilmsCount = createAction('films/resetFilmsCount');

export const increaseFilmsCount = createAction('films/increaseFilmsCount');

export const loadFilms = createAction<Films>('data/loadFilms');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
