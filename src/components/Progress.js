import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const duration = ms => {
  var minutes = moment.duration(ms).minutes()
  var seconds = moment.duration(ms).seconds()

  seconds = seconds < 10 ? `0${seconds}` : seconds

  return `${minutes}:${seconds}`
}

const propTypes = {
  value: PropTypes.number
}

const defaultProps = {
  values: 0
}

function Progress(props) {
  return (
    <div class="ProgressContainer">
      <div class="Progress">
        <div
          style={{
            width: `${props.value}%`
          }}
          class="ProgressValue"
        />
      </div>

      <div class="ProgressInfo">
        <div class="ProgressDuration">{duration(props.currentTime * 1000)}</div>
        <div class="ProgressDuration">{duration(props.duration)}</div>
      </div>
    </div>
  )
}

Progress.propTypes = propTypes
Progress.defaultProps = defaultProps

export default Progress
