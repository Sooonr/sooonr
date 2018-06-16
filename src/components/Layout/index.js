import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Route, Link } from 'react-router-dom';

import Home from '../Home';
import Quote from '../Quote';
import ShowQuote from '../ShowQuote';
import UpdateQuote from '../UpdateQuote';
import Login from '../Login';
import Signup from '../Signup';
import Event from '../Event';

import Container from '../utils/Container';

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

    let isConnected = <Link className={css(styles.navLink)} to="/login">Connexion</Link>
    if (user) isConnected = <span className={css(styles.navLink)} >Bienvenue {user.username} <button onClick={this.logout} className={css(styles.navLink)} to="/login">Déconnexion</button></span>


    return (
      <div className={css(styles.app)}>
        <header className={css(styles.appHeader)}>
          <div className={css(styles.smallHeader)}>
            <a className={css(styles.smallHeaderLink)} href="https://github.com/ValentinKajdan/ReactCRUD" target="_blank">
              <img className={css(styles.smallHeaderImg)} src="/img/github.png" width="20"/> ReactCRUD - Join us to build the most powerfull CRUD based on ReactJS !
            </a>
            <span>
              Valentin Kajdan - Rudy Lantoarijaona - Antoine Lucas
            </span>
          </div>
          <h1 className={css(styles.appTitle)}>Welcome to ReactCRUD</h1>
          <nav className={css(styles.nav)}>
            <Link className={css(styles.navLink)} to="/">Home</Link>
            <Link className={css(styles.navLink)} to="/new">Add a quote</Link>
            {isConnected}
          </nav>
        </header>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact render={()=><Login loginFunc={this.login} />} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/event/:id" exact component={Event} />
          <Route path="/new" exact component={Quote} />
          <Route path="/quote/:id" exact component={ShowQuote} />
          <Route path="/quote/update/:id" exact component={UpdateQuote} />
        </main>
        <footer className={css(styles.appFooter)}>
          <Container>
            This is the footer
          </Container>
        </footer>
      </div>
    );
  }
}

const styles = StyleSheet.create({
    smallHeader: {

      display: 'none',

      // display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#000',
      fontSize: 12,
      marginBottom: 10,
      padding: '0 20px',
      height: 35,
      width: '100%',
      backgroundColor: '#fff',
    },
    smallHeaderLink: {
      display: 'flex',
      alignItems: 'center',
      color: '#000',
      textDecoration: 'none',
      opacity: '0.7',
      ':hover': {
        opacity: '1',
      }
    },
    smallHeaderImg: {
      marginRight: 10,
    },
    appHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#222',
      paddingBottom: 20,
      color: 'white',
    },
    appTitle: {
      fontSize: '1.5em',
      color: '#fff',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      width: '100%',
      maxWidth: 840,
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      ':hover': {
        opacity: '0.8'
      }
    },
    appFooter: {
      height: 100,
      padding: '20px 0',
      backgroundColor: '#212121',
      marginTop: 30,
      color: '#fff',
    }
});

export default Layout;
