import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Menu from "./components/nav/Menu";
import AdminDashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import AdminProducts from "./pages/admin/Products";
import UserOrders from "./pages/user/Orders";
import UserProfile from "./pages/user/Profile";
import UserDashboard from "./pages/user/Dashboard";

const PageNotFound = () => {
  return <div className="d-flex justify-content-center align-items-center vh-100">
    404 | Page not found
  </div>
}

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
        </Route>
        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
