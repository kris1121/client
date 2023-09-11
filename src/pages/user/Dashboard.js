import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";

import { useAuth } from '../../context/auth';
import Jumbotron from '../../components/cards/Jumbotron';
import UserMenu from '../../components/nav/UserMenu';

const UserDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Dashboard"
      />
      <div className='container-fluid'>
        <div className='row box'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-4'>
            <div className='p-3 mt-2 mb-2 h4 bg-light'>User Information</div>
            <ul className='list-group'>
              <li className='list-group-item'>{auth?.user?.name}</li>
              <li className='list-group-item'>{auth?.user?.email}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDashboard