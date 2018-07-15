import axios from 'axios';
import { getUserById } from './users';

export const getEvent = async idEvent => {
  try {
    const res = await axios.get('http://localhost:3001/api/event/' + idEvent); 
     /*const res = await axios.get('http://localhost:3001/api/events/'); */
    console.log(res);
    console.log(res.data.creator);
    console.log(res.data._id);
    if (res.data._id) {
      const creator = await getUserById(res.data.creator);
      res.data.creator = creator;
      res.data.error = false;
      
      res.data;

      return;

     

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
     const res = await axios.post('http://localhost:3001/api/event/edit/' + event._id, {
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
