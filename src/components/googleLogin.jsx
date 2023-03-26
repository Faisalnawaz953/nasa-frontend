import { GoogleLogin } from 'react-google-login';
import { CLIENT_ID } from '../contants/constants';
import React from 'react'

export default function LoginWithGoogle() {
    const handleGoogleLogin = (googleUser) => {
        const idToken = googleUser.getAuthResponse().id_token;
        console.log("idToken",idToken)
       
      }
      
      const handleGoogleLoginFailure = (error) => {
        console.log('Google login failure:', error);
      }
  return (
    <div>
        <GoogleLogin
  clientId={CLIENT_ID}
  buttonText="Login with Google"
  onSuccess={handleGoogleLogin}
  onFailure={handleGoogleLoginFailure}
  className="inline-flex w-full justify-center rounded-md  bg-gradient-to-r from-light-purple to-dark-purple bg-origin-border py-2 sm:py-3 px-2 text-xs sm:text-sm font-normal text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
/>
    </div>
  )
}
