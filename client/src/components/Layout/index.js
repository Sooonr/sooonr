import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Route, Link } from 'react-router-dom';

import Home from '../Home';
import icons from 'glyphicons'
import Login from '../Login';
import Signup from '../Signup';
import Event from '../Event';
import NewEvent from '../Event/eventNew';

import Container from '../utils/Container';
import Button from '../utils/Button';

import { getUserById, loginUser } from '../../db/users';

class Layout extends Component {

  state = {
    user: null,
  }

   componentDidMount = () => {
     const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : null;
     if (userId) this.actualUser(userId);
   }

  actualUser = async userId => {
    //Load actual user
    const user = await getUserById(userId);
    this.setState({ user });
  }

  logout = () => {
    //Logout user
    localStorage.removeItem('userId');
    this.setState({ user: null})
  }

  
  login = async (username, password) => {
    console.log(username);
  console.log(password);
    //Loin user
    const isLogin = await loginUser(username, password);

    if (isLogin.error) {
      return {
        error: true,
        message: isLogin.message,
      }
    } else {
      localStorage.setItem('userId', isLogin.user._id);
      this.setState({
        user: isLogin.user,
      });
      return {
        error: false,
      }
    }
  }

  render() {
    const { user } = this.state;
    console.log(user);
    let isConnected =
      <span className={css(styles.userBox)}>
        <Link to="/login"><Button content='Connexion' /></Link>
      </span>
    if (user) isConnected =
      <span className={css(styles.userBox)}>
        <span>Bienvenue {user.username}</span>
        <Button onClick={this.logout} style={styles.logButton} content='Déconnexion' />
      </span>


    return (
      <div className={css(styles.app)}>
        <header className={css(styles.appHeader)}>
          <div className={css(styles.smallHeader)}>
            <a className={css(styles.smallHeaderLink)} href="https://github.com/Sooonr/sooonr" target="_blank">
              <img className={css(styles.smallHeaderImg)} src="/img/githubWhite.png" width="20"/> Sooonr - Join us on Github!
            </a>
            <span>
              Valentin Kajdan - Rudy Lantoarijaona - Antoine Lucas
            </span>
          </div>
          <nav className={css(styles.nav)}>
            <Link to="/">
              <img className={css(styles.headerImg)} src="/img/sooonr.png" width="50"/>
            </Link>
            <div className={css(styles.navLinks)}>
              <Link className={css(styles.navLink)} to="/">Home</Link>
              <Link className={css(styles.navLink)} to="/event/new">Add an event</Link>
              <Link className={css(styles.navLink)} to="/#">Agenda</Link>
              {!user &&
                <Link className={css(styles.navLink)} to="/signup">Sign Up</Link>
              }
              {isConnected}
            </div>
          </nav>
        </header>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact render={()=><Login loginFunc={this.login} />} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/event/show/:id" exact component={Event} />
          <Route path="/event/new" exact render={()=><NewEvent user={user} />} />
        </main>
        <footer className={css(styles.appFooter)}>
          <div className={css(styles.white)}>
            @2018 - Sooonr
          </div>
        </footer>
        
      </div>


    );
  }
}

const styles = StyleSheet.create({
    smallHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#ffffff',
      fontSize: 12,
      padding: '0 20px',
      height: 35,
      width: '100%',
      backgroundColor: '#212121',
    },
    smallHeaderLink: {
      display: 'flex',
      alignItems: 'center',
      color: '#ffffff',
      textDecoration: 'none',
      opacity: '0.7',
      ':hover': {
        opacity: '1',
      }
    },
    smallHeaderImg: {
      marginRight: 10,
    },
    headerImg: {
      width: 100,
      height: '100%'
    },
    appHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
      color: 'black',
      opacity: '1',
      boxShadow: '0 2px 2px rgba(0,0,0,.1)',
    },
    appTitle: {
      fontSize: '1.5em',
      color: '#fff',
    },
    nav: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      padding: '0 20px',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center'
    },
    navLink: {
      color: '#212121',
      textDecoration: 'none',
      marginRight: 25,
      padding: '20px 0',
      ':hover': {
        opacity: '0.7',
      }
    },
    userBox: {
      borderLeft: '1px solid #e0e0e0',
      paddingLeft: 20,
    },
    logButton: {
      marginLeft: 20
    },
    appFooter: {
      height: 100,
      padding: '20px 0',
      backgroundColor: '#212121',
      marginTop: 30,
      color: '#fff',
    },
    white: {
      width: '100%',
      maxWidth: 840,
      height: '100%',
      margin: 'auto',
      paddingTop: 20,
      color: '#fff',
      textAlign: 'center',
      // Tab
      '@media (max-width: 860px)': {
         padding: 20,
      },
    }
});

export default Layout;
