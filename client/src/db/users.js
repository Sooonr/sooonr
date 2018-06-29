import axios from 'axios';

const localEndpoint = 'http://localhost:3001';
const prodEndpoint = 'https://api.sooonr.fr';

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
