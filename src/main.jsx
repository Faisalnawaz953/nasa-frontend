import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from 'react-router-dom'
import { CLIENT_ID } from './contants/constants';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
  <React.StrictMode>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
  </React.StrictMode>
  </GoogleOAuthProvider>
)
