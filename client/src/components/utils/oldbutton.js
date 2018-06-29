import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Utils extends Component {

    static propTypes = {
      content: PropTypes.string.isRequired,
      style: PropTypes.object
    }

      render() {
        <button className={css([styles.button, customStyle])} >{content}</button>
      }

  }

const styles = StyleSheet.create({
    button: {
        padding: '.8em 2em',
        backgroundColor: 'rgba(255,255,255,.2)',
        color: 'black',
        borderRadius: '8px',
        textDecoration: 'none',
        backgroundColor: 'transparent',
        border: '1px solid black',
        margin: '1%',
        ':hover':{
            borderColor: '#ffa70d',
            color: '#ffa70d',
            boxShadow: '0px 1px 8px 0px rgba(245,199,0,.2)',
                }
        }
});

export default button;
