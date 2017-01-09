import { CLIENT_ID, USER_ID } from 'constants/soundcloud';
import fetch from 'isomorphic-fetch';
const FETCH_PLAYLISTS = 'FETCH_PLAYLISTS';
const PLAYLISTS_URL = `//api.soundcloud.com/users/${USER_ID}/playlists?client_id=${CLIENT_ID}`;

export function play() {
  return (dispatch) => {
    dispatch({ type: 'PLAY' });
  }
}

export function playTrack(track) {

  return (dispatch) => {
    fetch(`//api.soundcloud.com/tracks/${track.id}/stream?client_id=${CLIENT_ID}`)
      .then((res) => {

        track.playableURL = res.url;

        dispatch({
          type: 'PLAY_TRACK',
          track
        });
      });
  }
}

export function loadTrack(track) {

  return (dispatch) => {
    fetch(`//api.soundcloud.com/tracks/${track.id}/stream?client_id=${CLIENT_ID}`)
      .then(res => {

        track.playableURL = res.url;

        if (track.artwork_url) {
          track.artwork_url = track.artwork_url.replace('-large', '-original');
        }

        dispatch({
          type: 'LOAD_TRACK',
          track
        });
      });
  }
}

export function playPlaylist(playlist) {
  return (dispatch) => {
    dispatch({
      type: 'PLAY_PLAYLIST',
      playlist
    });
  }
}

export function pause() {
  return (dispatch) => {
    dispatch({ type: 'PAUSE' });
  }
}

export function next(track) {
  return (dispatch) => {
    dispatch(playTrack(track));
  }
}

export function prev(track) {
  return (dispatch) => {
    dispatch(playTrack(track));
  }
}
