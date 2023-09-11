import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";

import { useAuth } from '../../context/auth';
import Jumbotron from '../../components/cards/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';
import CategoryForm from "../../components/forms/CategoryForm";


const AdminCategory = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  useEffect(() => {
    loadCategories()
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data?.name}" is created`);
        setName("");
        loadCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error('Create category failed. Try again');
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/category/${selected._id}`, {name: updatingName});
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is updated`);
        setSelected(null);
        setUpdatingName("");
        loadCategories();
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Category may already exist. Try again`);
    }
  } 

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/category/${selected._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is deleted`);
        setSelected(null);
        setUpdatingName("");
        loadCategories();
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Delete failed`);
    }
  } 

  const showModal = () => {
    setVisible(true);
  }

  const handleOk = () => {
    setVisible(false);
  }

  const handleCancel = () => {
    setVisible(false);
  }

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Admin Dashboard"
      />
      <div className='container-fluid'>
        <div className='row box'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <div className='p-3 mt-2 mb-2 h4 bg-light'>Manage Categories</div>
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />
            <hr />
            <div className="d-flex">
              {categories.map(category => (
                <button
                  key={category._id}
                  className="btn btn-outline-primary m-3"
                  onClick={() => {
                    showModal();
                    setSelected(category);
                    setUpdatingName(category.name);
                  }}>
                  {category.name}
                </button>
              ))}
            </div>
            <Modal
              open={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <CategoryForm
                value={updatingName}
                setValue={setUpdatingName}
                handleSubmit={handleUpdate}
                btnText="Update"
                handleDelete={handleDelete}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminCategory
