import { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";

import { useAuth } from '../../context/auth';
import Login from '../../pages/auth/Login';

const PrivateRoute = () => {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (auth?.token) {
            setOk(true);
        } else {
            setOk(false);
        }
    }, [auth?.token])
  return ok ? <Outlet /> : <Login />
}

export default PrivateRoute