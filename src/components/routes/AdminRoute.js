import { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import axios from "axios";

import { useAuth } from '../../context/auth';
import Loading from './Loading';

const AdminRoute = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    // if (auth?.token) {
    //     setOk(true);
    // } else {
    //     setOk(false);
    // }
    const adminCheck = async () => {
      try {
        const { data } = await axios.get('/admin-check');
        if (data?.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (auth?.token) adminCheck();

  }, [auth?.token])

  return ok ? <Outlet /> : <Loading path=""/>
}

export default AdminRoute