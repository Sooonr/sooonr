import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';


class SearchBar extends Component {


    
      render() {
                     
        return( 
         <div className={css(styles.searchContainer)}>
        <form className={css(styles.formSearchContainer)} >
          <input className={css(styles.inputSearchBar)} type="text"  id="search-bar" name="name" placeholder="Rechercher un évenement" ></input>
          <a className={css(styles.Link)} href="#">
              <img className={css(styles.searchIcon)} src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" />
          </a>
        </form>
      <select className={css(styles.linkBtn)} >
        <option value="valeur1">Tri par date</option> 
        <option value="valeur2" selected> Plus récents</option>
        <option value="valeur3">Plus anciens</option>
      </select>
      <select className={css(styles.linkBtn)} >
        <option value="valeur1">Tri par type</option> 
        <option value="valeur2" selected>Plus anciens</option>
        <option value="valeur3">Passé</option>
      </select>
      </div>
      )
        

        }
    
      }
    
    
    const styles = StyleSheet.create({
        searchContainer: {
            width: '70%',
            display: 'block',
            margin: '0 auto',
      
          },
          inputSearchBar: {
            margin: '0 auto',
            width: '100%',
            height: '45px',
            padding: '0 20px',
            fontSize: '1rem',
            outline: 'none',
            marginTop: '10px',
          },
          searchIcon: {
            position: 'relative',
            float: 'right',
            width: '75px',
            height: '75px',
            top: '-62px',
            
          },
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
    
    export default SearchBar;
    

