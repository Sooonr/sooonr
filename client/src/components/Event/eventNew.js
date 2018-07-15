import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Redirect } from 'react-router-dom';
import 'moment/locale/fr';
import moment from 'moment';
import axios from 'axios';

import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { getEvent, editEvent } from '../../db/events';

import Loader from '../utils/Loader';
import Title from '../utils/Title';
import Subtitle from '../utils/Subtitle';
import Container from '../utils/Container';
import Upload from '../Upload';

class eventEdit extends Component {

  static propTypes = {
      user: PropTypes.object.isRequired,
   };

  state = {
    loading: false,
    redirect: false,
    event: {}
   };

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  onContentStateChange = () => {
    const { editorState, event } = this.state;
    this.setState({
      event: {
        ...event,
        description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      }
    })
  }

 updateContent = ({ target: {value, name} }) => {
   this.setState(({ event }) => ({
      event: {
         ...event,
         [name]: value,
      },
   }));
 }

  handleSubmit = async () => {
    const { event } = this.state;
    event.updatedAt = Date.now;
    const updatedEvent = await editEvent(event);
    if (!updatedEvent.error) this.setState({ redirect: true })
  }

  handleSubmitAdd = (creator, title, date, description, adress, createdAt,updatedAt,deletedAt,participants,imgUrl) =>{
    const { event } = this.state;
     //const {creator, title, date, description, adress, createdAt,updatedAt,deletedAt,participants,imgUrl } = event;
     
      axios.post('http://localhost:3001/api/events', {
        creator,
        title,
        date,
        description,
        adress,
        createdAt,
         updatedAt,
        deletedAt,
        participants,
        imgUrl,
      })
      .then(res => {
        if (res.data.error) {
          this.setState({ data: res.data })
        } else {
          this.setState({
            data: res.data,
            creator :'',
            title:'',
            date:'',
            description:'',
            adress:'',
            createdAt:'',
            updatedAt:'',
            deletedAt:'',
            participants:'',
            imgUrl:'',
            loading: false,
            redirect: true,
          });
        }
      })
    
  }

  render() {

    if (!localStorage.getItem('userId')) return <Container>Vous devez être connecté pour accéder à cette page</Container>

    const { user } = this.props;
    const { event, loading, editorState, contentState, redirect } = this.state;
    console.log(user);
    console.log(localStorage.getItem('userId'));
    if (redirect) return <Redirect to={`/event/show/${event._id}`} />;

    moment.locale('fr');

    return (
      <div>
        <div className={css(styles.eventPage)} >
            <div
              className={css(styles.headerImg)}
              style={{ backgroundColor: 'grey' }}
            />
            <div className={css(styles.content)}>
  <div className={css(styles.text_box_main)}>
   <p className={css(styles.body_text_header)}>Créer un évenement</p>
   <div className={css(styles.body_code_main)}>

    <Container>
              <div>
                <form onSubmit={this.handleSubmitAdd}>
                <div className={css(styles.eventInfosBar)} >
                  <div className={css(styles.date)}>
                    <input type='date' className={css(styles.simple_large)} />
                  </div>
                  <input className={css(styles.simple_large)} type='text' name='title' placeholder='Name of the event' />
                </div>
                <Upload></Upload>
                
                <div className={css(styles.eventCreator)} >
                  <span>Evènement créé par <strong>moi</strong> le {moment().format("Do MMMM YYYY")}. </span>
                </div>
                <div className={css(styles.eventDescription)}>
                  <Subtitle content="A propos" />

                  <Editor
                    initialContentState={contentState}
                    editorState={editorState}
                    editorClassName={css(styles.editor)}
                    onContentStateChange={this.onContentStateChange}
                    onEditorStateChange={this.onEditorStateChange} />

                </div>
                <div className={css(styles.eventDescription)}>
                  <Subtitle content="Localisation" />
                  <input name="adress" type="text" className={css(styles.simple_large)} placeholder='Event adress' onChange={this.updateContent} />
                </div>
                <button onClick={this.handleSubmit} className={css(styles.submit)}>Enregistrer</button>
                </form>
              </div>
            </Container>

   </div>
   </div>
   </div>
            
           
          </div>
        </div>
    )
  }
}

const styles = StyleSheet.create({
    headerImg: {
      height: 300,
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'flex-end'
    },
    loaderContainer: {
      marginTop: 25,
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    registerBar: {
      width: '100%',
      padding: '10px 50px',
      display: 'flex',
      alignItems: 'center',
    },
    innerBar: {
      width: '100%',
      maxWidth: 840,
      margin: 'auto',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    participantsNumber: {
      color: '#fff',
      position: 'relative',
      top: 27,
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#604c8d',
    },
    eventInfosBar: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'left',
    },
    date: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingRight: 20,
      fontSize: 16,
    },
    dateDay: {
      fontSize: 22,
    },
    eventCreator: {
      textAlign: 'left',
      opacity: '0.5',
      marginBottom: 30,
    },
    eventDescription: {
      textAlign: 'justify',
    },
    editor: {
      padding: '0 15px',
      borderRadius: 2,
      border: '1px solid #F1F1F1',
      display: 'flex',
      justifyContent: 'flex-start',
      background: 'white',
      flexWrap: 'wrap',
      marginBottom: 5,
    },
    content: {
      marginTop:'5%',
      top:'200px',
      textAlign:'center',
      opacity:1,
    },
    text_box_main: {
      width:'600px',
      margin:'auto',
      marginBottom:'50px',
      boxShadow:'0px 4px 20px rgba(0, 0, 0, 0.15)',
      padding:'10px',
    },
    body_text_header: {
      color:'#191919',
      
      fontWeight:700,
      opacity:0.6,
      borderStyle:'groove',
      borderTop:'none',
      borderLeft:'none',
      borderRight:'none',
      padding:'17px',
      width:'100%',
      margin:'auto',
      borderWidth:'1px',
    },
    simple_large: {
      borderRadius:'5px',
      padding:'10px',
      width:'240px',
      overflow:'hidden',
      borderStyle:'groove',
      opacity:'0.5',      
      fontWeight:400,
      fontSize:'16px',
      position:'relative',
      margin:'5px',
      ':focus': {
        outline:'none',
        opacity:'0.7',
      }
    },
    body_code_main: {
      padding:'10px',
      margin:'10px',
      display:'inline-block',
    },
    submit: {
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
      marginTop: '10%',
      ':hover': {
        backgroundColor: '#856bbf',
        boxShadow: '0 4px 10px 0px rgba(0, 0, 0, 0.225)'
      }
    },
    
});

export default eventEdit;
