import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Container extends Component {

  render() {

    return (
      <div className={css(styles.divider)} />
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    margin: '20px 0',
    backgroundColor: '#e0e0e0',
    // display: 'block',
  }
});

export default Container;
