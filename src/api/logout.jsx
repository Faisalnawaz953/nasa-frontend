import axios from "axios";
import { useQuery } from "react-query";
export default function userLogout (){

    return useQuery(['getUser'], async () => {
        try{
            return res=axios.get('http://localhost:5000/api/logout',
            {
              withCredentials: true,
            },
            )
        }
     
        catch (err){
            console.log(err)
        }
    }
    )
}
          
        
         