import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Route, Link } from 'react-router-dom';

import Home from '../Home';
import Quote from '../Quote';
import ShowQuote from '../ShowQuote';
import UpdateQuote from '../UpdateQuote';
import icons from 'glyphicons'
import Login from '../Login';
import Signup from '../Signup';

import { getActualUser, loginUser } from '../../db/users';

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
    const user = await getActualUser(userId);
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
    if (user) isConnected = <p>Bienvenue {user.username} <button onClick={this.logout} className={css(styles.navLink)} to="/login">Déconnexion</button></p>


    return (
      <div className={css(styles.app)}>
        <header className={css(styles.appHeader)}>
          <div className={css(styles.smallHeader)}>
            <a className={css(styles.smallHeaderLink)} href="https://github.com/ValentinKajdan/ReactCRUD" target="_blank">
              <img className={css(styles.smallHeaderImg)} src="/img/githubWhite.png" width="20"/> Sooonr - Join us to build the best!
            </a>
            <span>
              Valentin Kajdan - Rudy Lantoarijaona - Antoine Lucas
            </span>
          </div>
          <img className={css(styles.headerImg)} src="/img/sooonr.png" width="200"/>
          <nav className={css(styles.nav)}>
            <Link className={css(styles.navLink)} to="/">Home</Link>
            <Link className={css(styles.navLink)} to="/new">Add a quote</Link>
            <Link className={css(styles.navLink)} to="/#">Agenda</Link>
            <Link className={css(styles.navLink)} to="/signup">Sign Up</Link>
          </nav>
          {isConnected}
        </header>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact render={()=><Login loginFunc={this.login} />} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/new" exact component={Quote} />
          <Route path="/quote/:id" exact component={ShowQuote} />
          <Route path="/quote/update/:id" exact component={UpdateQuote} />
        </main>
      </div>


    );
  }
}

const styles = StyleSheet.create({
    app: {
      textAlign: 'center',
    },
    smallHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#ffffff',
      fontSize: 12,
      marginBottom: 10,
      padding: '0 20px',
      height: 35,
      width: '100%',
      backgroundColor: '#000000',
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
      margin: '2%',
    },
    appHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingBottom: 20,
      color: 'black',
      opacity: '1',
      borderBottom: '0.5px solid #ffa70d',
    },
    appTitle: {
      fontSize: '1.5em',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-around',
      
    },
    navLink: {
      color: '#aaa',
      textDecoration: 'none',
      textTransform: 'uppercase',
      marginRight: 25,
      ':hover': {
        opacity: '0.8',
               
      }
      
    },
});

export default Layout;
