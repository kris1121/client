import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Badge } from "antd";

import { useAuth } from "../../context/auth";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

const Menu = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const categories = useCategory();
  const [cart, setCart] = useCart();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <>
      <ul
        className="nav d-flex justify-content-between shadow-sm mb-2 
        align-items-center sticky-top bg-light"
      >
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
              style={{ textDecoration: "none" }}
            >
              CATEGORIES
            </a>
            <ul className="dropdown-menu">
              <li>
                <NavLink className="nav-link" to={`/categories`}>
                  All categories
                </NavLink>
              </li>
              {categories?.map((category) => (
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

        <li className="nav-item">
          <Badge count={cart?.length} showZero offset={[-5, 10]}>
            <NavLink className="nav-link" aria-current="page" to="/cart">
              CART
            </NavLink>
          </Badge>
        </li>

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
                {auth?.user?.name?.toUpperCase()}
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
