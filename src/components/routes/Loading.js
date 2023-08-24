import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";

import LoadingGIF from "../../images/loading.gif"

const Loading = ({ path = "login"}) => {
  const [count, setCount] = useState(3);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev)
    }, 1000);
    count === 0 && navigate(`/${path}`, { state: location.pathname });

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <img src={LoadingGIF} alt="Loading" style={{ width: '200px' }} />
    </div>
  )
}

export default Loading
