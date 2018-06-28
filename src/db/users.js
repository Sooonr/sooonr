import axios from 'axios';

export const getActualUser = async userId => {
  try {
    const res = await axios.get('http://localhost:3001/api/user/' + userId);
    return res.data;
  } catch (e) {
    console.log(e);
  }
 }

export const loginUser = async (username, password) => {
  try {
    const res = await axios.post('http://localhost:3001/api/login', {
      username,
      password,
    });

    if (res.data.error) {
      return {
        error: true,
        message: res.data.message
      }
    } else {
      return {
        error: false,
        user: res.data.user
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export const updateUser = async (username, email, firstname, lastname, userId) => {
  try {
    const res = await axios.post('http://localhost:3001/api/user/update/'+userId, {
      username,
      email,
      firstname,
      lastname
    });

    if (res.data.error) {
      return {
        error: true,
        message: res.data.message
      }
    } else {
      return {
        error: false,
        user: res.data.user
      }
    }
  } catch (e) {
    console.log(e);
  }
}