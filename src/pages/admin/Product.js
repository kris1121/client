import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from 'antd';

import { useAuth } from '../../context/auth';
import Jumbotron from '../../components/cards/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';

const AdminProduct = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Admin Dashboard"
      />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <div className='p-3 mt-2 mb-2 h4 bg-light'>Create Products</div>

            <div>
            <label className="btn btn-outline-secondary p-2 w-100 mb-3">
              {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={e => setPhoto(e.target.files[0])}
                  hidden
                />
            </label>
            </div>

            <Select
              className="w-100 mb-3"
              size="large"
              showSearch
              placeholder="Select category"
              onChange={(value) => setCategory(value)}
              options={categories.map(category => ({
                value: category.name,
                label: category.name
              }))}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProduct