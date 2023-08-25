import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";

import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

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

  const navigate = useNavigate();

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", desc);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);

      const { data } = await axios.post("/product", productData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is created`);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product create failed. Try again");
    }
  }

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Admin Dashboard"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Products</div>

            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product photo"
                  className="img img-responsive mb-3 mt-2"
                  height="200px"
                />
              </div>
            )}
            <div>
              <label className="btn btn-outline-secondary p-2 w-100 mb-3">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <input
              type="text"
              className="form-control mb-3 p-2"
              placeholder="Write a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              type="text"
              className="form-control mb-3 p-2"
              placeholder="Write a description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-3 p-2"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Select
              className="w-100 mb-3"
              size="large"
              showSearch
              placeholder="Select category"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => setCategory(value)}
              options={categories.map((category) => ({
                value: category._id,
                label: category.name,
              }))}
            />
              <Select
              className="w-100 mb-3"
              size="large"
              placeholder="Ckoose shipping"
              onChange={(value) => setShipping(value)}
              options={[
                {
                  value: 1,
                  label: "YES",
                },
                {
                  value: 0,
                  label: "NO"
                }
              ]}
            />
              <input
              type="number"
              min="1"
              className="form-control mb-3 p-2"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button
              className="btn btn-primary mb-5"
              onClick={handleSubmit}
            >Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
