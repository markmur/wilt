import { combineReducers } from 'redux';
import { requestPlaylists, receivePlaylists } from 'actions/playlists';

import { reduceArrayByProp, shuffle } from 'services';

const defaultState = {
  loading: false,
  playlists: [],
  queue: [],
  isPlaying: false,
  nowPlaying: null,
  currentTrackIndex: 0
};

function player(state = defaultState, action) {

  var tracks = [];

  switch(action.type) {
    case 'REQUEST_PLAYLISTS':
      return {
        ...state,
        loading: true
      };
    case 'RECEIVE_PLAYLISTS':

      tracks = action.playlists.reduce((list, playlist) => {
        return list = list.concat(playlist.tracks);
      }, tracks);

      return {
        ...state,
        loading: false,
        playlists: action.playlists,
        queue: shuffle(tracks)
      };
    case 'REQUEST_PLAYLISTS_ERROR':
      console.error(action.error);
      return {
        ...state,
        error: action.error
      };
    case 'PLAY':
      return {
        ...state,
        isPlaying: true
      };
    case 'PAUSE':
      return {
        ...state,
        isPlaying: false
      };
    case 'NEXT':
      if ((state.currentTrackIndex + 1) > state.queue.length) return;

      return {
        ...state,
        nowPlaying: state.queue[state.currentTrackIndex + 1],
        currentTrackIndex: state.currentTrackIndex + 1
      };
    case 'PREV':
      if ((state.currentTrackIndex - 1) < 0) return;

      return {
        ...state,
        nowPlaying: state.queue[state.currentTrackIndex - 1],
        currentTrackIndex: state.currentTrackIndex - 1
      };
    case 'SHUFFLE':
      return {
        ...state,
        queue: shuffle(state.queue)
      };
    case 'LOAD_TRACK':
      return {
        ...state,
        nowPlaying: action.track,
        currentTrackIndex: state.queue.indexOf(action.track)
      };
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
  player
});
