import React, { Component } from 'react'
import classnames from 'classnames';
import { getPrimaryColor } from 'services/Vibrant';
import MissingArtwork from 'images/missing.png';
import Vibrant from 'node-vibrant';
import moment from 'moment';

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: null
    };
  }

  render() {
    var { props } = this;
    var { track } = props;

    if (track.artwork_url) {
      track.artwork_url = track.artwork_url.replace(/large/, 't500x500');
      getPrimaryColor(track.artwork_url);
    } else track.artwork_url = MissingArtwork;

    return (
      <div
        key={track.title}
        onClick={(event) => props.playTrack(track)}
        style={{
          color: props.nowPlaying ? this.state.color : 'inherit',
          backgroundImage:  `url(${track.artwork_url})`
        }}
        class={classnames('Track', {
          nowPlaying: props.nowPlaying
        })}>
      </div>
    );
  }
}

export default Track;
