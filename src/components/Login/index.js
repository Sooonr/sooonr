import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Redirect } from 'react-router-dom';

class Login extends Component {

  static propTypes = {
      loginFunc: PropTypes.func.isRequired,
   };

  state = {
    inputValues: {},
    message: "Connectez vous",
    redirect: false
   };

  updateContent = ({ target: {value, name} }) => {
    this.setState(({ inputValues }) => ({
       inputValues: {
          ...inputValues,
          [name]: value,
       },
    }));
  }

   handleSubmit = async e => {
     e.preventDefault();

     const { inputValues } = this.state;
     const { username, password } = inputValues;

     if (username && password) {
       const login = await this.props.loginFunc(username, password);
       if (login.error) {
         this.setState({ message: login.message });
       } else {
         this.setState({ redirect: true })
       }
     }
   }

  render() {
      const { message, redirect } = this.state;

      if (redirect) return <Redirect to={'/'} />;

      return (
        <div className={css(styles.container)}>
          <form onSubmit={this.handleSubmit}>
            <input name="username" type="text" placeholder="login" onChange={this.updateContent} />
            <input name="password" type="password" placeholder="password" onChange={this.updateContent} />
            <button type="submit">Connexion </button>
          </form>
          <p>{message}</p>

        
        </div>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 25,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
});

export default Login;
