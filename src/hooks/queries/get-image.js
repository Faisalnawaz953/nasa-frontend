import { BASE_URL } from "../../contants/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { GET_IMAGE } from "../../contants/query-contant";

export default function useGetImage (){
    const token = Cookies.get("jwtoken")
    const navigate= useNavigate();
    return useQuery([GET_IMAGE, token], async () => {
        try {
          const res = await axios.get(
            `${BASE_URL}/api/nasa-image`,
            {
              headers: { Authorization: `token ${token}` },
            },
            {
              withCredentials: true,
            }
          );
          return res.data;
        } catch (err) {
          console.log("err in autherzation", err.response);
          navigate('/login')
          if (err.response.status === 500) {
            console.log("no token so logout");
            navigate('/login')
            return false;
          }
        }
      })
}