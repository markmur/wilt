import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'Header';
import Track from 'Track';
import MusicPlayer from 'MusicPlayer';
import Loader from 'Loader';
import Soundcloud from 'services/Soundcloud';

import { play, pause, playTrack, loadTrack } from 'actions/player';
import { fetchPlaylists } from 'actions/playlists';

const mapStateToProps = (state) =>  ({
  queue: state.player.queue,
  nowPlaying: state.player.nowPlaying
});

const mapDispatchToProps = (dispatch) => ({
  fetchPlaylists() {
    return dispatch(fetchPlaylists());
  },
  loadTrack(track) {
    return dispatch(loadTrack(track));
  },
  playTrack(track) {
    return dispatch(playTrack(track));
  }
});

@connect(mapStateToProps, mapDispatchToProps)
class Wilt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      playlists: []
    };
  }

  componentWillReceiveProps(props) {
    if (!props.playlists) return;

    var { isFetching, playlists } = props.playlists;

    this.setState({ isFetching, playlists });
  }

  componentDidMount() {
    this.props.fetchPlaylists()
      .then(() => {
        console.info('Successfully loaded playlists', this.props);
        this.props.loadTrack(this.props.queue[0]);
      });
  }

  render() {

    const { queue, nowPlaying } = this.props;

    return (
      <div class="Wilt">
        <Header />

        <div class="content">
          <MusicPlayer  />

          {nowPlaying ?
            <div
              class="BlurredArtwork"
              style={{
                backgroundImage: `url(${nowPlaying.artwork_url ?
                  nowPlaying.artwork_url.replace('large', 't500x500') :
                  null})`
              }}
              />
          : null}

          <div class="Tracks hidden">
            {queue.map(track =>
              <img
                class="Track"
                role="presentation"
                src={track.artwork_url ?
                  track.artwork_url.replace('large', 'original') :
                  null
                } />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Wilt;
