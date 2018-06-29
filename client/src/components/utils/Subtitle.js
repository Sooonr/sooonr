import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class Title extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired
  }

  render() {

    const { content } = this.props;

    return (
      <h2 className={css(styles.title)}>{content}</h2>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 300,
    letterSpacing: 1,
    textTransform: 'uppercase'
  }
});

export default Title;
