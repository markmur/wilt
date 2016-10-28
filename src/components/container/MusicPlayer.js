import React, { Component } from 'react';
import Slider from 'react-slider';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import Playlist from 'Playlist';
import Progress from 'presentational/Progress';
import { play, pause, next, prev } from 'actions/player';

const mapStateToProps = (state) => ({
  ...state.player
});

const mapDispatchToProps = (dispatch) => ({
  play() {
    return dispatch(play());
  },
  pause() {
    return dispatch(pause());
  },
  next() {
    return dispatch(next());
  },
  prev() {
    return dispatch(prev());
  }
});

@connect(mapStateToProps, mapDispatchToProps)
class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      nowPlaying: null,
      volume: 1,
      progress: 50
    };
  }

  componentWillReceiveProps(props) {
    if (props.nowPlaying && this.state.nowPlaying && props.nowPlaying.id === this.state.nowPlaying.id) {
      this.setState({ isPlaying: props.isPlaying });
      return;
    }

    this.setState({ ...props }, () => {
      if (props.nowPlaying) {
        this.audio = this.refs.audio;
        this.audio.play();

        this.audio.addEventListener('timeupdate', (event) => {

          if (event.target.currentTime === event.target.duration) {
            this.props.next();
          }

          this.setState({
            progress:
              (event.target.currentTime / event.target.duration) * 100
          });
        });
      }
    });
  }

  pause() {
    // Pause the audio element
    this.audio.pause();
    // Dispatch the event
    this.props.pause();
  }

  play() {
    // Play the audio element
    this.audio.play();
    // Dispatch the event
    this.props.play();
  }

  next() {
    this.props.next();
  }

  prev() {
    this.props.prev();
  }

  changeVolume(e) {
    this.refs.audio.volume = e.target.value;
    this.setState({
      volume: e.target.value
    });
  }

  renderNowPlaying() {
    var { nowPlaying, volume } = this.state;

    if (nowPlaying) {
      return (
        <div>
          <div class="NowPlaying">
            <audio ref="audio" src={nowPlaying.playableURL}></audio>
            <div class="title">{nowPlaying.title}</div>
            <small class="artist">{nowPlaying.user.username}</small>
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    var { isPlaying, nowPlaying, volume } = this.state;
    var { pause, play } = this.props;
    var playButton;

    if (isPlaying) {
      playButton = (
        <button ref="pause" id="pause" class="reset" onClick={this.pause.bind(this)}>
          <i class="icon-controller-pause"></i>
        </button>
      );
    } else {
      playButton = (
        <button ref="play" id="play" class="reset" onClick={this.play.bind(this)}>
          <i class="icon-controller-play"></i>
        </button>
      );
    }

    return (
      <div class="MusicPlayer">

        <div
          style={{
            backgroundImage: `url(${this.props.nowPlaying.artwork_url})`
          }}
          class="artwork" />

        <div class="controls">
          <button
            ref="prev"
            id="prev"
            class="reset"
            onClick={() => this.props.prev()}>
            <i class="icon-controller-prev"></i>
          </button>
          {playButton}
          <button
            ref="next"
            id="next"
            class="reset"
            onClick={() => this.props.next()}>
            <i class="icon-controller-next"></i>
          </button>
        </div>

        <Progress value={this.state.progress} />

        <div class="track-info">
          {this.renderNowPlaying()}
        </div>

        <div class="volume">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={this.changeVolume.bind(this)} />
          {Math.round(volume * 100)}%
        </div>


      </div>
    );
  }
}

export default MusicPlayer;
