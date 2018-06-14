import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';

class Signup extends Component {

  state = {
    inputValues: {},
    message: "inscrivez vous",
    data: "",
   };

  updateContent = ({ target: {value, name} }) => {
    this.setState(({ inputValues }) => ({
       inputValues: {
          ...inputValues,
          [name]: value,
       },
    }));
  }

   handleSubmit = e => {
     e.preventDefault();

     const { inputValues } = this.state;
     const { username, password } = inputValues;

     if (username && password) {
       this.connectUser(username, password)
     }
   }

  connectUser = (username, password) => {
    axios.post('http://localhost:3001/api/login', {
      username,
      password,
    })
    .then(res => {
      if (res.data.error) {
        this.setState({ message: res.data.message })
      } else {
        this.setState({
          message: "Connexion done"
        });
      }
    })
  }

  render() {
      const { message } = this.state;
      return (
        <div className={css(styles.container)}>
          <form onSubmit={this.handleSubmit}>
            <input name="username" type="text" placeholder="login" onChange={this.updateContent} />
            <input name="password" type="password" placeholder="password" onChange={this.updateContent} />
            <button type="submit">Connexion </button>
          </form>
          {message}
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

export default Signup;
