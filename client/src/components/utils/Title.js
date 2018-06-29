import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class Title extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    style: PropTypes.object
  }

  render() {

    const { content, style: customStyle } = this.props;

    return (
      <h1 className={css([styles.title, customStyle])}>{content}</h1>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    ':after': {
      content: "''",
      backgroundColor: '#604c8d',
      marginTop: 10,
      height: 5,
      width: '60%',
      display: 'block',
    }
  }
});

export default Title;
