import {
  SET_PRESUMED_ROLE,
  SET_HAS_GRANTS,
  SET_USER_INFO,
  SET_ENTRIES,
  ADD_ENTRY,
  SET_SHOW_ADMIN,
  SET_SHOW_POST_MENU,
  SET_PENDING_VIDEO_URL,
  SET_SHOW_RECORDING_MENU,
  SET_FULLSCREEN_VIDEO_URL,
  SET_SHOW_MORE_OPTIONS,
  SET_TARGET_ENTRY,
  SET_USER_ID,
  DELETE_ENTRY,
  SET_WINNER,
  SET_SHOW_SINGLE_ENTRY,
} from './constants';

export function setPresumedRole(presumedRole) {
  return {
    type: SET_PRESUMED_ROLE,
    presumedRole,
  };
}

export function setHasGrants(hasGrants) {
  return {
    type: SET_HAS_GRANTS,
    hasGrants,
  };
}

export function setUserInfo(userInfo) {
  return {
    type: SET_USER_INFO,
    userInfo,
  };
}

export function setEntries(entries) {
  return {
    type: SET_ENTRIES,
    entries,
  };
}

export function addEntry(entry) {
  return {
    type: ADD_ENTRY,
    entry,
  };
}

export function deleteEntry(id) {
  return {
    type: DELETE_ENTRY,
    id,
  };
}

export function setShowAdmin(show) {
  return {
    type: SET_SHOW_ADMIN,
    show,
  };
}

export function setShowPostMenu(show) {
  return {
    type: SET_SHOW_POST_MENU,
    show,
  };
}

export function setShowRecordingMenu(show) {
  return {
    type: SET_SHOW_RECORDING_MENU,
    show,
  };
}

export function setPendingVideoUrl(url) {
  return {
    type: SET_PENDING_VIDEO_URL,
    url,
  };
}

export function setFullscreenVideoUrl(url) {
  return {
    type: SET_FULLSCREEN_VIDEO_URL,
    url,
  };
}

export function setShowMoreOptions(show) {
  return {
    type: SET_SHOW_MORE_OPTIONS,
    show,
  };
}

export function setTargetEntry(entry) {
  return {
    type: SET_TARGET_ENTRY,
    entry,
  };
}

export function setUserId(id) {
  return {
    type: SET_USER_ID,
    id,
  };
}

export function setWinner(id) {
  return {
    type: SET_WINNER,
    id,
  };
}

export function setShowSingleEntry(show) {
  return {
    type: SET_SHOW_SINGLE_ENTRY,
    show,
  };
}
