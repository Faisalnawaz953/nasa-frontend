import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { successToaster } from "../utils/toasts";
import axios from "axios";

export default function Logout() {
    const navigate= useNavigate()
    
    
    useEffect(()=>{
        
        axios.get('http://localhost:5000/api/logout',
        {
          withCredentials: true,
        })
          
          .then(res => {
             
              successToaster('Successfully Logout !')
              navigate('/login')
            if (res.status!==200){
                const error= new Error ("error of logout",res.err);
                throw error
            }
            }).catch((err)=>{
                console.log(err)
            })
})

    return(
        <div>
            logout Page
        </div>
    )
}