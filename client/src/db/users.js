import axios from 'axios';

const localEndpoint = 'http://localhost:3001/api';
const prodEndpoint = 'http://51.68.121.118:3001/api';

export const getUserById = async userId => {
  try {
    const res = await axios.get(prodEndpoint + '/user/' + userId);
    return res.data;
  } catch (e) {
    console.log(e);
  }
 }

export const loginUser = async (username, password) => {
  try {
    const res = await axios.post(prodEndpoint + '/login', {
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
