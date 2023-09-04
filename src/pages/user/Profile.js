import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth?.user) {
      const { name, email, address } = auth.user;
      setName(name);
      setEmail(email);
      setAddress(address);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/profile", {
        name,
        address,
        password,
      });
      // console.log("profile updated =>", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Profile</div>
            <form onSubmit={handleSubmit}>
              <input
                className="form-control m-2 p-2"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
              />
              <input
                className="form-control m-2 p-2"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
              <input
                className="form-control m-2 p-2"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <textarea
                className="form-control m-2 p-2"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button className="btn btn-primary m-2 p-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
