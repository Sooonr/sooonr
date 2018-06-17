import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Utils extends Component {


    
      render() {

        <Link className={css(styles.linkBtn)} to={`#`}>Button</Link>
      }
    
    }

    const styles = StyleSheet.create({
        linkBtn: {
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