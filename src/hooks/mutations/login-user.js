import axios from "axios";
import { useMutation } from "react-query";
import { BASE_URL } from "../../contants/constants";

export  function useUserLogin() {
   const login = async ({values}) => {
        const result = await axios.post(`${BASE_URL}/api/login`, values, {
          withCredentials: true,
        });
    
        console.log("Login Successfully", result);
        return result;
      }
  return useMutation(login)
}

