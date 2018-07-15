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
                
<div className={css(styles.content)}>
  <div className={css(styles.text_box_main)}>
   <p className={css(styles.body_text_header)}>SIGN UP</p>
   <div className={css(styles.body_code_main)}>
     
   <form onSubmit={this.handleSubmit}>
       <input className={css(styles.simple_large)} name="username" type="text" placeholder="login" onChange={this.updateContent}/><br/>
       <input className={css(styles.simple_large)} name="password" type="password" placeholder="password" onChange={this.updateContent} /><br/>
       <input className={css(styles.simple_large)} name="email" type="text" placeholder="email" onChange={this.updateContent}/><br/>
       <button className={css(styles.submit)} type="submit">Inscription</button>
     </form>
     {message}
    </div>
  </div>
  
</div>
     /* </div>*/


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
      textAlign: 'center',
      position: 'relative',
      minHeight: '1px',
      flexBasis: 'auto',
      paddingLeft: '15px',
      paddingRight: '15px',
    },
    input: {
    font: 'inherit',
    color: 'currentColor',
    border: 0,
    margin: 0,
    padding: '6px 0 7px',
    display: 'block',
    minWidth: 0,
    flexGrow: 1,
    boxSizing: 'content-box',
    background: 'none',
    verticalAlign: 'middle',
    webkitTapHighlightColor: 'transparent',
    },
    submit: {
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
    center: {
      textAlign: 'center',
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

export default Signup;
