import { combineReducers } from 'redux'
import { requestPlaylists, receivePlaylists } from '../actions/playlists'

import { reduceArrayByProp, shuffle } from '../services'

const defaultState = {
  loading: false,
  playlists: [],
  queue: [],
  isPlaying: false,
  nowPlaying: null,
  currentTrackIndex: 0
}

function player(state = defaultState, action) {
  var tracks = []
  var currentTrackIndex = 0

  switch (action.type) {
    case 'REQUEST_PLAYLISTS':
      return {
        ...state,
        loading: true
      }
    case 'RECEIVE_PLAYLISTS':
      tracks = shuffle(
        action.playlists.reduce((list, playlist) => {
          return (list = list.concat(playlist.tracks))
        }, tracks)
      )

      return {
        ...state,
        loading: false,
        playlists: action.playlists,
        queue: tracks
      }
    case 'REQUEST_PLAYLISTS_ERROR':
      console.error(action.error)
      return {
        ...state,
        error: action.error
      }
    case 'LOAD_TRACK':
      currentTrackIndex = state.queue.indexOf(action.track)

      return {
        ...state,
        currentTrackIndex,
        prev: state.queue[currentTrackIndex - 1],
        nowPlaying: action.track,
        next: state.queue[currentTrackIndex + 1]
      }
    case 'PLAY_TRACK':
      currentTrackIndex = state.queue.indexOf(action.track)

      return {
        ...state,
        isPlaying: true,
        currentTrackIndex,
        prev: state.queue[currentTrackIndex - 1],
        nowPlaying: action.track,
        next: state.queue[currentTrackIndex + 1]
      }
    case 'PLAY':
      return {
        ...state,
        isPlaying: true
      }
    case 'PAUSE':
      return {
        ...state,
        isPlaying: false
      }
    case 'SHUFFLE':
      return {
        ...state,
        queue: shuffle(state.queue)
      }
    default:
      return state
  }
}

export default combineReducers({
  player
})
