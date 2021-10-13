import { fromJS } from 'immutable';

import {
  SET_PRESUMED_ROLE,
  SET_HAS_GRANTS,
  SET_USER_INFO,
  SET_ENTRIES,
  DELETE_ENTRY,
  ADD_ENTRY,
  SET_SHOW_ADMIN,
  SET_SHOW_POST_MENU,
  SET_PENDING_VIDEO_URL,
  SET_SHOW_RECORDING_MENU,
  SET_FULLSCREEN_VIDEO_URL,
  SET_SHOW_MORE_OPTIONS,
  SET_TARGET_ENTRY,
  SET_USER_ID,
  SET_WINNER,
  SET_SHOW_SINGLE_ENTRY,
} from './constants';

export const baseState = fromJS({
  presumedRole: 'unknown',
  userId: null,
  hasGrants: false,
  userInfo: null,
  entries: null,
  showAdmin: false,
  showPostMenu: false,
  showRecordingMenu: false,
  showMoreOptions: false,
  showSingleEntry: false,
  targetEntry: null,
  pendingVideoUrl: '',
  fullscreenVideoUrl: '',
  winner: null,
});

export const buildReducer = () => {
  const initialState = baseState;

  return (state = initialState, action) => {
    switch (action.type) {
      case SET_PRESUMED_ROLE: {
        return state.set('presumedRole', action.presumedRole);
      }

      case SET_HAS_GRANTS: {
        return state.set('hasGrants', action.hasGrants);
      }

      case SET_USER_INFO: {
        return state.set('userInfo', action.userInfo);
      }

      case SET_ENTRIES: {
        return state.set('entries', action.entries);
      }

      case DELETE_ENTRY: {
        const entries = state.get('entries');
        const updatedEntries = entries.filter((entry) => entry.id !== action.id);
        return state.set('entries', updatedEntries);
      }

      case ADD_ENTRY: {
        const entries = state.get('entries');
        return state.set('entries', [...entries, action.entry]);
      }

      case SET_SHOW_ADMIN: {
        return state.set('showAdmin', action.show);
      }

      case SET_SHOW_POST_MENU: {
        return state.set('showPostMenu', action.show);
      }
      case SET_PENDING_VIDEO_URL: {
        return state.set('pendingVideoUrl', action.url);
      }

      case SET_SHOW_RECORDING_MENU: {
        return state.set('showRecordingMenu', action.show);
      }

      case SET_SHOW_MORE_OPTIONS: {
        return state.set('showMoreOptions', action.show);
      }

      case SET_TARGET_ENTRY: {
        return state.set('targetEntry', action.entry);
      }

      case SET_FULLSCREEN_VIDEO_URL: {
        return state.set('fullscreenVideoUrl', action.url);
      }

      case SET_USER_ID: {
        return state.set('userId', action.id);
      }

      case SET_WINNER: {
        return state.set('winner', action.id);
      }

      case SET_SHOW_SINGLE_ENTRY: {
        return state.set('showSingleEntry', action.show);
      }
      default:
        return state;
    }
  };
};
