import {createAction} from '@reduxjs/toolkit';

export const setActiveGenre = createAction<string>('setActiveGenre');

export const getFilteredGenre = createAction('films/getFilteredGenre');

export const resetFilmsCount = createAction('resetFilmsCount');
