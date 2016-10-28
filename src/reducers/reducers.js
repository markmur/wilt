import { combineReducers } from 'redux';
import { requestPlaylists, receivePlaylists } from 'actions/playlists';

function playlists(state = {
  isFetching: false,
  playlists: []
}, action) {
  switch(action.type) {
    case 'REQUEST_PLAYLISTS':
      return { ...state, isFetching: true };
    case 'RECEIVE_PLAYLISTS':
      return {
        ...state,
        isFetching: false,
        playlists: action.playlists
      };
    case 'REQUEST_PLAYLISTS_ERROR':
      console.error(action.error);
      return {
        ...state,
        error: action.error
      };
  }

  return state;
}

function player(state = {
  queue: [],
  isPlaying: false,
  nowPlaying: {}
}, action) {
  switch(action.type) {
    case 'PLAY':
      return {...state, isPlaying: true};
    case 'PAUSE':
      return {...state, isPlaying: false};
    case 'PLAY_TRACK':
      return {
        ...state,
        isPlaying: true,
        nowPlaying: action.track
      };
    case 'PLAY_PLAYLIST':
      return {
        ...state,
        isPlaying: true,
        queue: action.playlist,
        nowPlaying: action.playlist[0]
      };
  }

  return state;
}

export default combineReducers({
  player,
  playlists
});
