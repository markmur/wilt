import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Track from './Track'
import MusicPlayer from './MusicPlayer'
import Loader from './Loader'
import Soundcloud from '../services/soundcloud'

import { play, pause, playTrack, loadTrack } from '../actions/player'
import { fetchPlaylists } from '../actions/playlists'

const mapStateToProps = state => ({
  queue: state.player.queue,
  nowPlaying: state.player.nowPlaying
})

const mapDispatchToProps = dispatch => ({
  fetchPlaylists() {
    return dispatch(fetchPlaylists())
  },
  loadTrack(track) {
    return dispatch(loadTrack(track))
  },
  playTrack(track) {
    return dispatch(playTrack(track))
  }
})

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Wilt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      playlists: []
    }
  }

  componentWillReceiveProps(props) {
    if (!props.playlists) return

    var { isFetching, playlists } = props.playlists

    this.setState({ isFetching, playlists })
  }

  componentDidMount() {
    this.props.fetchPlaylists().then(() => {
      this.props.loadTrack(this.props.queue[0])
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.nowPlaying) return

    document.title = nextProps.nowPlaying.title

    if (nextProps.nowPlaying.artwork_url) {
      this.setState({
        artwork: nextProps.nowPlaying.artwork_url.replace('large', 'original')
      })
    }
  }

  render() {
    const { queue, nowPlaying } = this.props
    const { artwork } = this.state

    return (
      <div class="Wilt">
        <Header />

        <div class="content">
          <MusicPlayer />

          <img
            class="hidden"
            src={artwork}
            onError={() => {
              this.setState({
                artwork: nowPlaying.artwork_url
              })
            }}
          />

          {nowPlaying ? (
            <div
              class="BlurredArtwork"
              style={{
                backgroundImage: `url(${artwork})`
              }}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

export default Wilt
