import { BASE_URL } from "../../contants/constants";
import axios from "axios";
import { useQuery } from "react-query";
import { GET_USER } from "../../contants/query-contant";
import { useNavigate } from "react-router-dom";
import { successToaster } from "../utils/toasts";

export default function useUserLogout (){
    const navigate = useNavigate();
    return useQuery([GET_USER], async () => {
        try {
          const res = await axios.get(
    
            `${BASE_URL}/api/logout`,
            
            {
              withCredentials: true,
            }
          );
          if(res.status==200){
            successToaster('Successfully Logout !')
                          navigate('/login')
          }
          return res.data;

        } catch (err) {
          console.log("err in logout", err.response);
         
        }
      })
}