import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'Header';
import Playlist from 'Playlist';
import MusicPlayer from 'MusicPlayer';
import Loader from 'Loader';
import Soundcloud from 'services/Soundcloud';

import { play, pause, playTrack } from 'actions/player';
import { fetchPlaylists } from 'actions/playlists';

const mapStateToProps = (state) =>  ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  fetchPlaylists() {
    return dispatch(fetchPlaylists());
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
      .then(({ playlists }) => {
        this.props.playTrack(playlists[0].tracks[0]);
      });
  }

  render() {
    var { isFetching, playlists } = this.state;
    var { dispatch, player } = this.props;

    return (
      <div class="Wilt">
        <Header />
        <div class="content">

          <MusicPlayer  />

          <div class="Playlists">
            {this.state.playlists.map((playlist) =>
              <Playlist
                key={playlist.id}
                nowPlaying={player.nowPlaying}
                playTrack={(track) => this.props.playTrack(track)}
                playlist={playlist}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Wilt;
