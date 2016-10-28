import { CLIENT_ID, USER_ID } from 'constants/soundcloud';
import fetch from 'isomorphic-fetch';
const FETCH_PLAYLISTS = 'FETCH_PLAYLISTS';
const PLAYLISTS_URL = `//api.soundcloud.com/users/${USER_ID}/playlists?client_id=${CLIENT_ID}`;

// Constants
export const PLAY   = 'PLAY';
export const PLAY_TRACK   = 'PLAY_TRACK';
export const PLAY_PLAYLIST = 'PLAY_PLAYLIST';
export const PAUSE  = 'PAUSE';
export const NEXT   = 'NEXT';
export const PREV   = 'PREV';

// Action creators
export function play() {
  return (dispatch) => {
    dispatch({ type: PLAY });
  }
}

export function playTrack(track) {
  console.debug('Fetching Track', track.title);
  return (dispatch) => {
    fetch(`//api.soundcloud.com/tracks/${track.id}/stream?client_id=${CLIENT_ID}`)
      // .then(res => res.json())
      .then(res => {

        track.playableURL = res.url;

        dispatch({
          type: PLAY_TRACK,
          track
        });
      });
  }
}

export function playPlaylist(playlist) {
  return (dispatch) => {
    dispatch({
      type: PLAY_PLAYLIST,
      playlist
    });
  }
}

export function pause() {
  return (dispatch) => {
    dispatch({ type: PAUSE });
  }
}

export function next() {
  return (dispatch) => {
    dispatch({ type: NEXT });
  }
}

export function prev() {
  return (dispatch) => {
    dispatch({ type: PREV });
  }
}
