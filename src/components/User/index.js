import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Redirect } from 'react-router-dom';

import { getActualUser, loginUser, updateUser } from '../../db/users';

class User extends Component {

  state = {
    inputValues: {},
    message: "Connectez vous",
    redirect: false
   };

   componentDidMount = () => {
     const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : null;
     if (userId) this.actualUser(userId);
   }

  actualUser = async userId => {
    //Load actual user
    const user = await getActualUser(userId);
    this.setState({ user });
    this.setState(({ inputValues }) => ({
       inputValues: {
       },
    }));
  }

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

     const { inputValues, user } = this.state;
     const { username, password, firstname, lastname, email } = inputValues;

     if (username && email) {
     	const response = await updateUser( username, email, firstname, lastname, user.id);
     	if (response.error) {
          this.setState({ message: response.message });
        } else {
          this.setState({ redirect: true })
        }
     }
   }

  render() {
      const { message, redirect, user, inputValues } = this.state;

      if (redirect) return <Redirect to={'/'} />;
      	return (
        <div className={css(styles.container)}>
	      <form onSubmit={this.handleSubmit}>
	        <input name="username" type="text" value={user ? user.username : ""} onChange={this.updateContent} />
	        <input name="firstname" type="text" placeholder={ user && user.name ? "" : "Votre prénom" } value={ user && user.name ? user.name.firstname : inputValues.firstname } onChange={this.updateContent} />
	        <input name="lastname" type="text" placeholder={ user && user.name ? "" : "Votre nom" } value={ user && user.name ? user.name.lastname : inputValues.lastname } onChange={this.updateContent} />
	        <input name="email" type="text" value={user ? user.email : ""} onChange={this.updateContent} />
	        <button type="submit">Valider </button>
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
    }
});

export default User;
