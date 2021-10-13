import { createSelector } from 'reselect';
import { baseState } from './reducer';

export const localState = (state) => state || baseState;

export const makeSelectPresumedRole = () =>
  createSelector(localState, (state) => state.get('presumedRole'));

export const makeSelectHasGrants = () =>
  createSelector(localState, (state) => state.get('hasGrants'));

export const makeSelectUserInfo = () =>
  createSelector(localState, (state) => state.get('userInfo'));

export const makeSelectEntries = () =>
  createSelector(localState, (state) => state.get('entries'));

export const makeSelectShowAdmin = () =>
  createSelector(localState, (state) => state.get('showAdmin'));

export const makeSelectShowPostMenu = () =>
  createSelector(localState, (state) => state.get('showPostMenu'));

export const makeSelectShowRecordingMenu = () =>
  createSelector(localState, (state) => state.get('showRecordingMenu'));

export const makeSelectPendingVideoUrl = () =>
  createSelector(localState, (state) => state.get('pendingVideoUrl'));

export const makeSelectFullscreenVideoUrl = () =>
  createSelector(localState, (state) => state.get('fullscreenVideoUrl'));

export const makeSelectShowMoreOptions = () =>
  createSelector(localState, (state) => state.get('showMoreOptions'));

export const makeSelectShowSingleEntry = () =>
  createSelector(localState, (state) => state.get('showSingleEntry'));

export const makeSelectTargetEntry = () =>
  createSelector(localState, (state) => state.get('targetEntry'));

export const makeSelectUserId = () =>
  createSelector(localState, (state) => state.get('userId'));

export const makeSelectWinner = () =>
  createSelector(localState, (state) => state.get('winner'));

export const makeSelectWinnerEntry = () =>
  createSelector(localState, (state) => {
    const id = state.get('winner');
    const entries = state.get('entries');

    if (!id || !entries) return null;

    return entries.find((entry) => entry.userId === id);
  });

export const makeSelectHasPosted = () =>
  createSelector(localState, (state) => {
    const entries = state.get('entries');
    const userId = state.get('userId');

    if (!userId || !entries) return false;

    return entries.find((entry) => entry.userId === userId) != null;
  });
