import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { successToaster } from '../utils/toasts';
import axios from 'axios';
import { BASE_URL } from '../contants/constants';
import { googleLogout } from '@react-oauth/google';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/logout`, {
        withCredentials: true
      })

      .then((res) => {
        googleLogout()
        successToaster('Successfully Logout !');
        navigate('/login');
        if (res.status !== 200) {
          const error = new Error('error of logout', res.err);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  return <div>logout Page</div>;
}
