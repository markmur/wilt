import { CLIENT_ID, USER_ID } from 'constants/soundcloud';
import fetch from 'isomorphic-fetch';
const FETCH_PLAYLISTS = 'FETCH_PLAYLISTS';
const PLAYLISTS_URL = `//api.soundcloud.com/users/${USER_ID}/playlists?client_id=${CLIENT_ID}`;

export const REQUEST_PLAYLISTS = 'REQUEST_PLAYLISTS';
function requestPlaylists() {
  return {
    type: REQUEST_PLAYLISTS,
  };
}

export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';
function receivePlaylists(playlists) {
  return {
    type: RECEIVE_PLAYLISTS,
    receivedAt: Date.now(),
    playlists
  }
}

export const REQUEST_PLAYLISTS_ERROR = 'REQUEST_PLAYLISTS_ERROR';
function requestPlaylistsError(error) {
  return {
    type: REQUEST_PLAYLISTS_ERROR,
    error
  };
}

export function fetchPlaylists() {
  return function(dispatch) {

    dispatch(requestPlaylists());

    return fetch(PLAYLISTS_URL)
      .then(res => res.json())
      .then(playlists => {
        return dispatch(receivePlaylists(playlists));
      })
      .catch(err => {
        return dispatch(requestPlaylistsError(err));
      });
  }
}
