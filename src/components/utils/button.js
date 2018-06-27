import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class Button extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    style: PropTypes.object,
    onClick: PropTypes.func
  }

  render() {

    const { content, style: customStyle, onClick } = this.props;
    console.log(content);

    return (
      <button
      onClick={e => {
         if (onClick) onClick(e)
      }}
      className={css([styles.button, customStyle])}>{content}</button>
    );
  }
}

    const styles = StyleSheet.create({
        button: {
          color: '#fff',
          backgroundColor: '#f2f2f2',
          fontSize: 14,
          textTransform: 'uppercase',
          padding: '10px 16px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: '#604c8d',
          boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.225)',
          transition: 'all .3s ease-out',
          ':hover': {
            backgroundColor: '#856bbf',
            boxShadow: '0 4px 10px 0px rgba(0, 0, 0, 0.225)'
          }
        }
    });

    export default Button;
