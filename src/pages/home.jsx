import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDailyImage } from '../api/nasa-image';
import getUser from '../hooks/get-user';

export default function Home() {
const navigate= useNavigate()
const user = getUser();
console.log("user",user.data)
  const [image, setImage] = useState([])
  useEffect(() => {
 
  
    const getImage = async () => {
      
      const res = await getDailyImage();
      if(res){
        setImage(res.url);
        console.log('image', res.url);
      }
      else{
        navigate('/login')
      }
    };
    getImage();
  }, [setImage]);
  console.log(image);

  return (
    <div className='my-9'>

      <h1 className='text-4xl text-center font-semibold'> NASA Daily Image</h1>
      <div className='flex justify-center my-9'>
      <img src={image}  height={700} width={700}></img>
      </div>
    </div>
  )
}
