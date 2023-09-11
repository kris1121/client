import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";

import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

const AdminProductUpdate = () => {
  const [auth, setAuth] = useAuth();

  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadCategories();;
  }, []);

  useEffect(() => {
    loadProduct();
  }, [])

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      if (data) {
        setName(data.name);
        setDesc(data.description);
        setCategory(data.category._id);
        setPrice(data.price);
        setQuantity(data.quantity);
        setShipping(data.shipping);
        setId(data._id);
        setPhoto(data.photo);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
      photo && productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", desc);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);

      const { data } = await axios.put(`/product/${id}`, productData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is updated`);
        navigate("/dashboard/admin/products");
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
      toast.error("Product update failed. Try again");
    }
  }

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want delete this product?");
      if (!answer) return;
      const { data } = await axios.delete(`/product/${id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is deleted`);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Admin Dashboard"
      />
      <div className="container-fluid">
        <div className="row box">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Update Product</div>

            {photo ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product photo"
                  className="img img-responsive mb-3 mt-2"
                  height="200px"
                />
              </div>
            ) : (
              <div className="text-center">
                <img
                  src={`${process.env.REACT_APP_API}/product/photo/${id}`}
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
              value={category}
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
              value={shipping === true ? "Yes" : "No"}
              onChange={(value) => setShipping(value)}
              options={[
                {
                  value: 1,
                  label: "Yes",
                },
                {
                  value: 0,
                  label: "No"
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
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary mb-5"
                onClick={handleSubmit}
              >Update</button>
              <button
                className="btn btn-danger mb-5"
                onClick={handleDelete}
              >Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductUpdate;