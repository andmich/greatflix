
import { createSelector } from 'reselect';
import { GreatflixState } from '../../types';

const getAccountStateSelector = (store: GreatflixState) => store.Account;

export const selectAccountState = createSelector(
    getAccountStateSelector,
    (account) => account
);