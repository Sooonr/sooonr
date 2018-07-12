import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Loader extends Component {

  render() {

    return (
      <div className={css(styles.spinner)}></div>
    );
  }
}

const keyframes = {
    '0%': {
        transform: 'rotate(0)',
    },
    '100%': {
        transform: 'rotate(359.9deg)',
    },
};

const styles = StyleSheet.create({
  spinner: {
    borderRadius: '100%',
    borderStyle: 'solid',
    borderWidth: '0.25rem',
    height: '5rem',
    width: '5rem',
    animationName: [keyframes],
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderTopColor: 'rgba(0, 0, 0, 1)'
  }
});

export default Loader;
