import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'moment/locale/fr';
import moment from 'moment';
import icons from 'glyphicons';

import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { getEvent, editEvent } from '../../db/events';

import Loader from '../utils/Loader';
import Title from '../utils/Title';
import Subtitle from '../utils/Subtitle';
import Button from '../utils/Button';
import Container from '../utils/Container';
import Divider from '../utils/Divider';

class Event extends Component {

  state = {
    loading: true,
    error: false,
    errorCode: null,
    errorMessage: null,
    event: {},
    editMode: true,
   };

  componentDidMount = () => {
    console.log(this.props.location.pathname.split('/')[3]);
    const idEvent = this.props.location.pathname.split('/')[3];
    this.getCurrentEvent(idEvent);
  }

  getCurrentEvent = async idEvent => {
    console.log('Id Event : '+ idEvent);
    const event = await getEvent(idEvent);
  
    console.log('EVENT : ' + event);
    console.log(event);
    const contentState = ContentState.createFromBlockArray(htmlToDraft(event.description).contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    if (event.error) {
      this.setState({
        error: true,
        errorCode: event.errorCode,
        errorMessage: event.errorMessage,
        loading: false,
      })
    } else {
      this.setState({ event, loading: false, editorState });
    }
  }

  // Edit functions

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

 handleChangeDate = date => {
   this.setState(({ event }) => ({
      event: {
         ...event,
         date,
      },
   }));
  }

  handleSubmit = async () => {
    const { event } = this.state;
    event.updatedAt = Date.now;
    const updatedEvent = await editEvent(event);
    if (!updatedEvent.error) this.setState({ editMode: false })
  }

  render() {

    const { event, loading, error, errorCode, errorMessage, editMode, editorState, contentState } = this.state;

    if (error) return <Container>Erreur {errorCode} : {errorMessage}</Container>

    moment.locale('fr');
    const month = moment(event.date).format("MMM")
    const day = moment(event.date).format("Do")
    const year = moment(event.date).format("YYY")
    let creatorName = "";
    let userEvent = false;

    if (!loading) {
      userEvent = localStorage.getItem('userId') === event.creator._id && true;

      console.log(localStorage.getItem('userId'));
      console.log(event.creator);
      console.log(userEvent);
      creatorName = userEvent ? 'moi' : event.creator.name /*event.creator*/ ? `${event.creator.name.first /*event.creator.value*/} ${event.creator.name.last /*event.creator*/}` : event.creator.username;
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
                {editMode &&
                  <div className={css(styles.editContent)}>
                    <span className={css(styles.exitEdit)} onClick={() => this.setState({editMode: false})} title="Annuler" >{icons.cross}</span>
                    <h2 className={css(styles.editTitle)}>
                      {icons.edit} Modifier votre évènement
                    </h2>
                    <div className={css(styles.editElement)}>
                      <span>Date : </span>
                      <DatePicker
                      selected={moment(event.date)}
                      onChange={this.handleChangeDate}
                      className={css(styles.editInput)}
                      />
                    </div>
                    <div className={css(styles.editElement)}>
                      <span>Titre : </span>
                      <input type="text" name="title" value={event.title} onChange={this.updateContent} className={css(styles.editInput)} />
                    </div>
                    <div className={css(styles.editElement)}>
                      <span>Adresse : </span>
                      <input type="text" name="adress" value={event.adress} onChange={this.updateContent} className={css(styles.editInput)} />
                    </div>
                  </div>
                  }
                  <div className={css(styles.eventInfosBar)} >
                    <div className={css(styles.date)}>
                      <span>{month}</span>
                      <span className={css(styles.dateDay)}>{day}</span>
                    </div>
                    <Title style={styles.eventTitle} content={event.title} />
                    {!userEvent && (
                      <Button content="Je m'inscris" />
                    )}
                    {userEvent && !editMode && (
                      <Button content={`${icons.edit} Modifier`} onClick={() => this.setState({editMode: true})} />
                    )}
                    {userEvent && editMode && (
                      <Button content={`${icons.check} Valider`} onClick={this.handleSubmit} />
                    )}
                  </div>
                  <div className={css(styles.eventCreator)} >
                    <span>Evènement créé par <strong>{creatorName}</strong> le {moment(event.createdAt).format("Do MMMM YYYY")}. </span>
                    {event.updatedAt && (
                      <span>Modifié le {moment(event.updatedAt).format("Do MMMM YYYY")}.</span>
                    )}
                  </div>
                  <Divider />
                  <div className={css(styles.participantsNumber)}>
                    <Subtitle content="Participants" />
                    {event.participants.length == 0 ? "Aucun participants pour le moment" : `${event.participants.length} participant(s)`}
                  </div>
                  <Divider />
                  <div className={css(styles.eventDescription)}>
                    <Subtitle content="A propos" />
                    {editMode &&
                      <Editor
                        initialContentState={contentState}
                        editorState={editorState}
                        editorClassName={css(styles.editor)}
                        onContentStateChange={this.onContentStateChange}
                        onEditorStateChange={this.onEditorStateChange} />
                    }
                    {!editMode &&
                      <div dangerouslySetInnerHTML={{__html: event.description}} />
                    }
                  </div>
                  <div className={css(styles.eventDescription)}>
                    <Subtitle content="Localisation" />
                    {event.adress}
                  </div>
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
    editBar: {
      width: '100%',
      display: 'flex',
      backgroundColor: 'rgba(255, 167, 13, .3)',
    },
    innerEditBar: {
      width: '100%',
      maxWidth: 840,
      margin: 'auto',
      padding: '10px 0',
    },
    editLink: {
      color: '#fff !important',
      textDecoration: 'none',
      textTransform: 'uppercase',
    },
    inscriptionButton: {
    },
    participantsNumber: {
    },
    eventInfosBar: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'left',
      justifyContent: 'space-between',
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
    eventTitle: {
      flex: '1',
    },
    eventCreator: {
      textAlign: 'left',
      opacity: '0.5',
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
    editContent: {
      margin: '10px 0',
      padding: 10,
      borderRadius: 4,
      backgroundColor: '#FFE082',
      fontSize: 14,
      position: 'relative'
    },
    editTitle: {
      margin: 5,
      marginBottom: 10
    },
    editElement: {
      display: 'flex',
      alignItems: 'center',
      margin: '5px 0'
    },
    editInput: {
      padding: 0,
      marginLeft: 5,
      border: 'none',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      flex: '1'
    },
    exitEdit: {
      position: 'absolute',
      right: 0,
      padding: 15,
      paddingTop: 0,
      fontSize: 24,
      opacity: '0.5',
      cursor: 'pointer',
      ':hover': {
        opacity: '1'
      }
    }
});

export default Event;
