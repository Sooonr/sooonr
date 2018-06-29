import axios from 'axios';
import { getUserById } from './users';

const localEndpoint = 'http://localhost:3001/api';
const prodEndpoint = 'http://51.68.121.118:3001/api';

export const getEvent = async idEvent => {
  try {
    const res = await axios.get(localEndpoint + '/event/' + idEvent);
    console.log(res);
    if (res.data._id) {
      const creator = await getUserById(res.data.creator);
      res.data.creator = creator;
      res.data.error = false;
      return res.data;
    } else {
      return {
        error: true,
        errorCode: '404',
        errorMessage: 'No events found'
      }
    }
  } catch (e) {
    console.log(e);
  }
 }

 export const editEvent = async event => {
   try {
     const res = await axios.post(localEndpoint + '/event/edit/' + event._id, {
       title: event.title,
       description: event.description,
       updatedAt: event.updatedAt,
       date: event.date,
       imgUrl: event.imgUrl,
       adress: event.adress
     });
     if (res.data.error) {
       return {
         error: true,
         message: res.data.message
       }
     } else {
       return {
         error: false,
       }
     }
   } catch (e) {
     console.log(e);
   }
 }
