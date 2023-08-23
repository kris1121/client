import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import LoadingGIF from "../../images/loading.gif"

const Loading = () => {
  const [count, setCount] = useState(3);

  const navigate= useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev)
    }, 1000);
    count === 0 && navigate("/login");

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <img src={LoadingGIF} alt="Loading" style={{ width: '200px' }}/>
    </div>
  )
}

export default Loading
