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
     const { username, email, password } = inputValues;

     if (username && password && email) {
       this.createUser(username, email, password)
     }
   }

  createUser = (username, email, password) => {
    axios.post('http://localhost:3001/api/users', {
      username,
      password,
      email,
      role: 0,
    })
    .then(res => {
      if (res.data.error) {
        this.setState({ data: res.data })
      } else {
        this.setState({
          message: "Inscription done"
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
            <input name="email" type="text" placeholder="email" onChange={this.updateContent} />
            <input name="password" type="password" placeholder="password" onChange={this.updateContent} />
            <button type="submit">Inscription</button>
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
