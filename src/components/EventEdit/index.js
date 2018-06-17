import React, { Component } from 'react';
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

class EventEdit extends Component {

  state = {
    loading: true,
    redirect: false,
    event: {}
   };

  componentDidMount = () => {
    const idEvent = this.props.location.pathname.split('/')[3];
    this.getCurrentEvent(idEvent);
  }

  getCurrentEvent = async idEvent => {
    const event = await getEvent(idEvent);
    const contentState = ContentState.createFromBlockArray(htmlToDraft(event.description).contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({
      event,
      loading: false,
      editorState,
    });
  }

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


    const { event, loading, editorState, contentState, redirect } = this.state;

    if (redirect) return <Redirect to={`/event/${event._id}`} />;

    moment.locale('fr');
    const month = moment(event.date).format("MMM")
    const day = moment(event.date).format("Do")
    const year = moment(event.date).format("YYY")

    let creatorName = '';

    if (!loading && localStorage.getItem('userId') !== event.creator._id) return <Container>Access Denied</Container>
    if (!loading) {
      creatorName = event.creator.name ? `${event.creator.name.first} ${event.creator.name.last}` : event.creator.username;
    }

    return (
      <div>
        <div className={css(styles.eventPage)} >
          {loading && (
            <div
              className={css(styles.headerImg)}
              style={{ backgroundColor: 'grey' }} />
          )}
          {!loading && (
            <div
            className={css(styles.headerImg)}
            style={{ background: `url(${event.imgUrl}) center top` }}>
              <div className={css(styles.registerBar)}>
                <div className={css(styles.innerBar)}>
                  {event.participants.length == 0 ? (
                    <span className={css(styles.participantsNumber)}>Aucun participants pour le moment</span>
                  ) : (<span className={css(styles.participantsNumber)}>{event.participants.length} participant(s)</span>)}
                </div>
              </div>
            </div>
          )}
              {loading && (
                <div className={css(styles.loaderContainer)} >
                  <Loader />
                </div>
              )}
              <Container>
              {!loading &&
                <div>
                  <div className={css(styles.eventInfosBar)} >
                    <div className={css(styles.date)}>
                      <span>{month}</span>
                      <span className={css(styles.dateDay)}>{day}</span>
                    </div>
                    <Title content={event.title} />
                  </div>
                  <div className={css(styles.eventCreator)} >
                    <span>Evènement créé par <strong>{creatorName}</strong> le {moment(event.createdAt).format("Do MMMM YYYY")}. </span>
                    {event.updatedAt && (
                      <span>Modifié le {moment(event.updatedAt).format("Do MMMM YYYY")}.</span>
                    )}
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
                    <input name="adress" type="text" value={event.adress} onChange={this.updateContent} />
                  </div>
                  <button onClick={this.handleSubmit}>Enregistrer !!</button>
                </div>
              }
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

export default EventEdit;
