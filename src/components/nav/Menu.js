import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";

const Menu = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const categories = useCategory();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <>
      <ul className="nav container d-flex justify-content-between shadow-sm mb-2">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            HOME
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/shop">
            SHOP
          </NavLink>
        </li>

        <div className="dropdown">
          <li>
            <a
              className="nav-item pointer dropdown-toggle"
              data-bs-toggle="dropdown"
              style={{ textDecoration: 'none' }}
            >
              CATEGORIES
            </a>
            <ul className="dropdown-menu">
              <li>
                <NavLink
                  className="nav-link"
                  to={`/categories`}
                >
                  All categories
                </NavLink>
              </li>
              {categories?.map(category => (
                <li key={category?._id}>
                  <NavLink
                    className="nav-link"
                    to={`/category/${category?.slug}`}
                  >
                    {category?.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </div>

        <Search />

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <a
                className="nav-item pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${auth?.user.role === 1 ? "admin" : "user"
                      }`}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item pointer">
                  <a className="nav-link" onClick={logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
};

export default Menu;
