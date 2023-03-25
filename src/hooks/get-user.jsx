import Cookies from "js-cookie";
import { useQuery } from "react-query";
export default function getUser(){
  
    const token = Cookies.get('jwtoken')
  const user= true;

    return useQuery(['getUser', token], async () => {
      try {
        if (!token) return null;
       return user;
    }
    catch(err){
        console.log(err)
        
    }
})
}
