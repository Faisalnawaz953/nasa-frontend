import axios from "axios";
import Cookies from "js-cookie";

  export async function getDailyImage() {
    try {
      const token = Cookies.get('jwtoken')
    
      const res = await axios.get('http://localhost:5000/api/nasa-image', {
        headers: { 'Authorization': `token ${token}` }
      },
        {
          withCredentials: true,
        })
      
      return res.data;
  
    }
    catch (err) {
      
      if (err.response.status === 500) {
        console.log("no token so logout");
        return false;
      }
  
  
    }

}

// const dailyImageSrc = response.imageUrl;
//       // Set the image source URL dynamically
//       $('img').attr('src', dailyImageSrc);