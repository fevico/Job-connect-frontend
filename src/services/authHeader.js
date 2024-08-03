import cookie from 'react-cookies'
export default function authHeader() {
    // const token = localStorage.getItem('token');
    const token = cookie.load('token')
      return {  
         Authorization: `Bearer ${token}`,
    };
   
  }