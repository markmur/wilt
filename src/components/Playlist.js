import React, { Component } from 'react'
import Track from './Track'

function Playlist(props) {
  return (
    <div class="Playlist">
      <div class="Tracks">
        {props.playlist.tracks.map(track => (
          <Track
            nowPlaying={props.nowPlaying.id === track.id}
            key={track.id}
            playTrack={track => props.playTrack(track)}
            track={track}
          />
        ))}
      </div>
    </div>
  )
}

export default Playlist
