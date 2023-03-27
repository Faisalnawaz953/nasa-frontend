import Cookies from 'js-cookie';
import { useQuery } from 'react-query';
import { GET_USER } from '../../contants/query-contant';
export default function getUser() {
  const token = Cookies.get('jwtoken');
  const user = true;

  return useQuery([GET_USER, token], async () => {
    try {
      if (!token) return null;
      return user;
    } catch (err) {
      console.log(err);
    }
  });
}
