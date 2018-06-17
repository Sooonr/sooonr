import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';


class ListEvent extends Component {


    
      render() {
                     
        return(<div className={css(styles.eventCardList)}>
        {
               this.state.data.map((props, key) =>             
               <Link key={key} className={css(styles.link)} to={`/quote/${props._id}`}>
               <div className={css(styles.eventCard)}>
                   <div className={css(styles.colorOverlay)}>                                   
                     <div className={css(styles.eventContent)}>         
                       <div className={css(styles.eventHeader)}>
                         <h3 className={css(styles.eventTitle)}>{props.name}</h3>
                         <h4 className={css(styles.eventLieu)}></h4>
                       </div>
                         <p className={css(styles.eventDetails)}>{props.quote}</p>
                         <div className={css(styles.eventShare)}>
                    
                     </div>     
                         <Link className={css(styles.linkBtn)} to={`/quote/${props._id}`}>Show</Link>
                     </div>	
                     <div className={css(styles.eventImg)}>
                           <img className={css(styles.headerImg)} src="/img/sooonr.png" width="200"/>
                     </div>	                         
                 </div>
               </div>
               </Link>
               )
              
             }
        </div>)
        

        }
    
      }
    
    
    const styles = StyleSheet.create({
        eventCard: {
            backgroundImage: 'red',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '70%',
            maxWidth: '800px',      
            display: 'block',
            margin: '5vh auto',
            borderRadius: '8px',
            boxShadow:'0px 8px 12px 0px rgba(0,0,0,0.25)',
        },
        colorOverlay: {
          width:'100%',
          height: '100%',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px  1px silver',
          backgroundColor : '#673AB7',
          backgroundBlendMode: 'multiply',
          display: 'flex',
        },
        eventContent: {
          width: '40%',
          display: 'block',
          position: 'relative',
          paddingRight:'1em',
          borderRight: 'double',
          padding: '5%',
          color: '#434343',
          backgroundColor:"white",
          height: '100%',
        },
        eventCardList: {
          width: '85%', 
          display: 'block',
          
        },
        eventImg: {
          backgroundColor: 'red',
          display: 'block',
          position: 'relative',   
          paddingRight:'1em',
          borderRight: 'double',
          padding: '15%',
          color: '#434343',
          borderRadius: '8px',   
          width: '60%',
        },
        eventDetails: {
          margin: '15%',
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
    
    export default ListEvent;
    

