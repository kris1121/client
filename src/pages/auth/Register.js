import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Jumbotron from "../../components/cards/Jumbotron";
import { useAuth } from "../../context/auth";

// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();


  
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

    // const v1 = USER_REGEX.test(user);
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
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Registration successful");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Registration failed. Error: ${error}`);
    }
  };

  return (
    <div>
      <Jumbotron title="Register" />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-3 ">
            <form
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Confirm your password"
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
              />

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <pre>{JSON.stringify(name, null, 4)}</pre>
    </div>
  );
};

export default Register;
