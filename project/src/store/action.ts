import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';

export const redirectToRoute = createAction<AppRoute>('site/redirectToRoute');

export const postComment = createAction('data/postComment', (value) => ({payload: value}));
