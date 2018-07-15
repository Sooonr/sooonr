import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Redirect } from 'react-router-dom';

import Container from '../utils/Container';

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
        <Container>
          
          <div className={css(styles.content)}>
  <div className={css(styles.text_box_main)}>
   <p className={css(styles.body_text_header)}>LOGIN</p>
   <div className={css(styles.body_code_main)}>
     
   <form onSubmit={this.handleSubmit}>
       <input className={css(styles.simple_large)} name="username" type="text" placeholder="login" onChange={this.updateContent}/><br/>
       <input className={css(styles.simple_large)} name="password" type="password" placeholder="password" onChange={this.updateContent} /><br/>
       <button className={css(styles.submit)} type="submit">Connexion</button>
     </form>
     {message}
    </div>
  </div>
  
</div>
        </Container>
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
    }, submit: {
      color: '#fff',
      backgroundColor: '#f2f2f2',
      fontSize: 14,
      textTransform: 'uppercase',
      padding: '10px 16px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#604c8d',
      boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.225)',
      transition: 'all .3s ease-out',
      marginTop: '10%',
      ':hover': {
        backgroundColor: '#856bbf',
        boxShadow: '0 4px 10px 0px rgba(0, 0, 0, 0.225)'
      }
    },
    
    content: {
      marginTop:'5%',
      top:'200px',
      textAlign:'center',
      opacity:1,
    },
    text_box_main: {
      width:'500px',
      margin:'auto',
      marginBottom:'50px',
      boxShadow:'0px 4px 20px rgba(0, 0, 0, 0.15)',
      padding:'10px',
    },
    body_text_header: {
      color:'#191919',
      
      fontWeight:700,
      opacity:0.6,
      borderStyle:'groove',
      borderTop:'none',
      borderLeft:'none',
      borderRight:'none',
      padding:'17px',
      width:'100px',
      margin:'auto',
      borderWidth:'1px',
    },
    
    body_code_main: {
      padding:'10px',
      margin:'10px',
      display:'inline-block',
    },
    simple_large: {
      borderRadius:'5px',
      padding:'10px',
      width:'240px',
      overflow:'hidden',
      borderStyle:'groove',
      opacity:'0.5',      
      fontWeight:400,
      fontSize:'16px',
      position:'relative',
      margin:'5px',
      ':focus': {
        outline:'none',
        opacity:'0.7',
      }
    }
});

export default Login;
