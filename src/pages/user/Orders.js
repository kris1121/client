import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import { useAuth } from '../../context/auth';
import Jumbotron from '../../components/cards/Jumbotron';
import UserMenu from '../../components/nav/UserMenu';
import HorizontalProductCard from "../../components/cards/HorizontaProductCard";

const UserOrders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);


  const getOrders = async () => {
    try {
      const { data } = await axios.get('/orders');
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Dashboard"
      />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <div className='p-3 mt-2 mb-2 h4 bg-light'>Orders</div>
            <div className='row m-2'>
              {orders?.map((order, index) => (
                <div
                  key={order._id} className='border shadow bg-light rounded-4 mb-5'
                >
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Ordered</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{order?.status}</td>
                        <td>{order?.buyer.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{order?.products?.length} products</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className='container'>
                    <div className='row'>
                      {order.products.map(product => (
                        <HorizontalProductCard
                          product={product}
                          key={product._id}
                          remove={false} />
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserOrders