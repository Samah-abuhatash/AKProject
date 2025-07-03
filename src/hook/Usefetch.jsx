import axios from 'axios';
import { useState, useEffect } from 'react';

function Usefetch(url) {
  const [Data, setData] = useState([]);
  const [Erorr, setErorr] = useState(null);
  const [Isloader, setLoader] = useState(true); 

  const Getdata = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setErorr(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    Getdata(); 
  }, []);

  return { Data, Erorr, Isloader };
}

export default Usefetch;
