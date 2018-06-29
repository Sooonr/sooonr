import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class Container extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {

    const { children } = this.props;

    return (
      <div className={css(styles.container)}>
        {children}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 840,
    height: '100%',
    margin: 'auto',
    paddingTop: 20,
    // Tab
    '@media (max-width: 860px)': {
       padding: 20,
    },
  }
});

export default Container;
