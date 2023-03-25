import axios from "axios";
import { useMutation} from 'react-query'

export async function userLogin(values) {
  return useMutation(
    async ()=>{
    const result =await axios.post('http://localhost:5000/api/login', values,
    {
      withCredentials: true,
    })
      
    console.log('Login Successfully', result)
        return result
   }
  )}


  

