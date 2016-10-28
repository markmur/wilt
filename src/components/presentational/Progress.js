import React, { PropTypes } from 'react';

const propTypes = {
  value: PropTypes.number
};

const defaultProps = {
  values: 0
};

function Progress(props) {
  return (
    <div class="Progress">
      <div
        style={{
          width: `${props.value}%`
        }}
        class="ProgressValue" />
    </div>
  );
}

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;

export default Progress;
