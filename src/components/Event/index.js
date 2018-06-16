import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';

import { getEvent } from '../../db/events';

import Loader from '../utils/Loader';
import Title from '../utils/Title';
import Subtitle from '../utils/Subtitle';
import Container from '../utils/Container';

class Event extends Component {

  state = {
    loading: true,
    event: {}
   };

  componentDidMount = () => {
    const idEvent = this.props.location.pathname.split('/')[2];
    this.getCurrentEvent(idEvent);
  }

  getCurrentEvent = async idEvent => {
    const event = await getEvent(idEvent);
    this.setState({ event, loading: false });
  }

  render() {

    const { event, loading } = this.state;
    moment.locale('fr');
    const month = moment(event.date).format("MMM")
    const day = moment(event.date).format("Do")
    const year = moment(event.date).format("YYY")
    let creatorName = "";
    let userEvent = false;

    if (!loading) {
      userEvent = localStorage.getItem('userId') === event.creator._id && true;
      creatorName = event.creator.name ? `${event.creator.name.firstname} ${event.creator.name.lastname}` : userEvent ? 'moi' : event.creator.username;
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
                    <span>Evènement créé par <strong>{creatorName}</strong> le {moment(event.createdAt).format("MMMM Do YYYY")}. </span>
                    {event.updatedAt && (
                      <span>Modifié le {moment(event.updatedAt).format("MMMM Do YYYY")}.</span>
                    )}
                    {userEvent && (
                      <a href="#"><br />Modifier mon évènement</a>
                    )}
                  </div>
                  <div className={css(styles.eventDescription)}>
                    <Subtitle content="A propos" />
                    {event.description}
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
    }
});

export default Event;
