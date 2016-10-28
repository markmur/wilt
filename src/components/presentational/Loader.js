import React, { Component, PropTypes } from 'react';

function Loader(props) {
  if (!props.loaded) {
    return (
      <div>
        {props.text}
      </div>
    );
  } else {
    return props.children || null;
  }
}

Loader.defaultProps = {
  text: 'Loading...'
};

Loader.propTypes = {
  loaded: PropTypes.bool.isRequired,
  text: PropTypes.string
};


export default Loader;
