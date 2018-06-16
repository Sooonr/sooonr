import axios from 'axios';
import { getUserById } from './users';

export const getEvent = async idEvent => {
  try {
    const res = await axios.get('http://localhost:3001/api/event/' + idEvent);
    const creator = await getUserById(res.data.creator);
    res.data.creator = creator;
    return res.data;
  } catch (e) {
    console.log(e);
  }
 }
