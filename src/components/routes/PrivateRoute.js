import { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import axios from "axios";

import { useAuth } from '../../context/auth';
import Loading from './Loading';

const PrivateRoute = () => {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            try {
                const { data } = await axios.get('/auth-check');
                if (data?.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (auth?.token) authCheck();

    }, [auth?.token])
    
    return ok ? <Outlet /> : <Loading />
}

export default PrivateRoute