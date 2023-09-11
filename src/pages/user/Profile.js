import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
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

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPwd;
    console.log(match)
    setValidMatch(match);
  }, [password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v2 = PWD_REGEX.test(password);

    if (!v2) {
      toast.error(` Password must have 6 to 24 characters.
      Must begin with a letter.
      Letters, numbers, underscores, hyphens allowed.`);
      return;
    }

    if (validMatch !== true) {
      toast.error(`Confirm your password`);
      return;
    }
    try {
      const { data } = await axios.put("/profile", {
        name,
        address,
        password,
      });
      // console.log("profile updated =>", data);

      if (data?.error) {
        toast.error(data.error);
      } else {
        // console.log("profile updated =>", data);
        setAuth({ ...auth, user: data });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Dashboard" />
      <div className="container-fluid">
        <div className="row box">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-4">
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
                // onChange={(e) => setEmail(e.target.value)}
                disabled
              />
              <input
                className="form-control m-2 p-2"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="form-control m-2 p-2"
                type="password"
                placeholder="Confirm your password"
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
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
