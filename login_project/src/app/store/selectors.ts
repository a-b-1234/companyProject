import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state.main || initialState;

export const selectPersonalDetails = createSelector(
  [selectDomain],
  main => main.personalDetails,
);