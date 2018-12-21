import React, { Component } from 'react'
import Slider from 'react-slider'
import { connect } from 'react-redux'
import shallowCompare from 'react-addons-shallow-compare'
import Playlist from './Playlist'
import moment from 'moment'
import PropTypes from 'prop-types'
import Progress from './Progress'
import { play, pause, playTrack, loadTrack } from '../actions/player'

const mapStateToProps = state => ({
  ...state.player
})

const mapDispatchToProps = (dispatch, props) => ({
  play() {
    return dispatch(play())
  },
  pause() {
    return dispatch(pause())
  },
  playTrack(track) {
    return dispatch(playTrack(track))
  },
  loadTrack(track) {
    return dispatch(loadTrack(track))
  }
})

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class MusicPlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      volume: 1,
      progress: 0,
      currentTime: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.nowPlaying || !this.props.nowPlaying) return

    if (
      nextProps.nowPlaying &&
      nextProps.nowPlaying.id === this.props.nowPlaying.id
    )
      return

    this.audio.pause()

    this.setState({
      isPlaying: nextProps.isPlaying,
      currentTime: 0,
      progress: 0
    })

    if (nextProps.nowPlaying && nextProps.isPlaying) {
      this.audio.load()
      this.play()
    }
  }

  pause() {
    // Pause the audio element
    if (this.audio) {
      this.audio.pause()
      this.props.pause()
    }
  }

  play() {
    // Play the audio element
    if (this.audio) {
      this.audio.play()
      this.props.play()
    }
  }

  next() {
    this.audio.pause()
    this.props.loadTrack(this.props.next)
  }

  prev() {
    this.audio.pause()
    this.props.playTrack(this.props.prev)
  }

  changeVolume(e) {
    this.audio.volume = e.target.value
    this.setState({ volume: e.target.value })
  }

  renderNowPlaying() {
    var { volume } = this.state
    var { nowPlaying } = this.props

    return (
      <div>
        <div class="NowPlaying">
          <audio
            onChange={event => {
              console.info('AUDIO onChange', event.target)

              this.setState({
                duration: event.target.duration
              })
            }}
            onTimeUpdate={event => {
              if (event.target.currentTime === event.target.duration) {
                this.next()
              }

              this.setState({
                currentTime: event.target.currentTime,
                progress:
                  (event.target.currentTime / event.target.duration) * 100
              })
            }}
            ref={c => {
              this.audio = c
            }}
          >
            <source src={nowPlaying.playableURL} />
          </audio>

          <div class="title"> {nowPlaying.title} </div>
          <small class="artist"> {nowPlaying.user.username} </small>
        </div>
      </div>
    )
  }

  render() {
    const { isPlaying, nowPlaying, pause, play } = this.props

    const { volume } = this.state

    if (!nowPlaying) return null

    // Higher res artwork
    var artwork = nowPlaying.artwork_url
    if (artwork) {
      artwork = artwork.replace('large', 't500x500')
    }

    var playButton

    if (isPlaying) {
      playButton = (
        <button
          ref="pause"
          id="pause"
          class="reset"
          onClick={this.pause.bind(this)}
        >
          <i class="icon-controller-pause" />
        </button>
      )
    } else {
      playButton = (
        <button
          ref="play"
          id="play"
          class="reset"
          onClick={this.play.bind(this)}
        >
          <i class="icon-controller-play" />
        </button>
      )
    }

    return (
      <div class="MusicPlayer">
        <div
          style={{
            backgroundImage: `url(${artwork})`
          }}
          class="artwork"
        />

        <div class="controls">
          <button
            ref="prev"
            id="prev"
            class="reset"
            onClick={() => this.prev()}
          >
            <i class="icon-controller-prev" />
          </button>

          {playButton}

          <button
            ref="next"
            id="next"
            class="reset"
            onClick={() => this.next()}
          >
            <i class="icon-controller-next" />
          </button>
        </div>

        <Progress
          duration={this.props.nowPlaying.duration}
          currentTime={this.state.currentTime}
          value={this.state.progress}
        />

        <div class="track-info">{this.renderNowPlaying()}</div>

        <div class="volume">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={this.changeVolume.bind(this)}
          />
          {Math.round(volume * 100)}%
        </div>
      </div>
    )
  }
}

export default MusicPlayer
