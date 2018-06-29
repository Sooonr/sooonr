import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Redirect } from 'react-router-dom';
import 'moment/locale/fr';
import moment from 'moment';

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

  render() {

    if (!localStorage.getItem('userId')) return <Container>Access Denied</Container>

    const { user } = this.props;
    const { event, loading, editorState, contentState, redirect } = this.state;
    console.log(user);

    if (redirect) return <Redirect to={`/event/${event._id}`} />;

    moment.locale('fr');

    return (
      <div>
        <div className={css(styles.eventPage)} >
            <div
              className={css(styles.headerImg)}
              style={{ backgroundColor: 'grey' }}
            />
            <Container>
              <div>
                <div className={css(styles.eventInfosBar)} >
                  <div className={css(styles.date)}>
                    <input type='date' />
                  </div>
                  <input type='text' name='title' placeholder='Name of the event' />
                </div>
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
                  <input name="adress" type="text" placeholder='Event adress' onChange={this.updateContent} />
                </div>
                <button onClick={this.handleSubmit}>Enregistrer !!</button>
              </div>
            </Container>
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
    }
});

export default eventEdit;
