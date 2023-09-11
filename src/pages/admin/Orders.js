import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import toast from "react-hot-toast";

import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import HorizontalProductCard from "../../components/cards/HorizontaProductCard";

const AdminOrders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changedStatus, setChangedStatus] = useState("");

  useEffect(() => {
    if (auth?.token) {
      getAllOrders();
    }
  }, [auth?.token]);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    setChangedStatus(value);
    try {
      const { data } = await axios.put(`order-status/${orderId}`, {
        status: value,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        getAllOrders();
        toast.success("Status updated");
      }
    } catch (error) {
      console.log(error);
      }
      
    //   const { data } = await axios.post('/mail', {value});
    //   console.log(data);
  };

  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Dashboard" />
      <div className="container-fluid">
        <div className="row box">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>
            <div className="row m-2">
              {orders?.map((order, index) => (
                <div
                  key={order._id}
                  className="border shadow bg-light rounded-4 mb-5"
                >
                  <table className="table">
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
                        <td>
                          <Select
                            bordered={false}
                            defaultValue={order?.status}
                            onChange={(value) => handleChange(order._id, value)}
                          >
                            {status.map((status, index) => (
                              <Select.Option key={index} value={status}>
                                {status}
                              </Select.Option>
                            ))}
                          </Select>
                        </td>
                        <td>{order?.buyer.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>
                          {order?.payment?.success ? "Success" : "Failed"}
                        </td>
                        <td>{order?.products?.length} products</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <div className="row">
                      {order.products.map((product) => (
                        <HorizontalProductCard
                          product={product}
                          key={product._id}
                          remove={false}
                        />
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
  );
};

export default AdminOrders;
