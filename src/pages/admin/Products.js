import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";


import { useAuth } from '../../context/auth';
import Jumbotron from '../../components/cards/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';


const AdminProducts = () => {
    const [auth, setAuth] = useAuth();
    
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
        loadProducts();
    }, []);  

    const loadProducts = async () => {
        try {
            const { data } = await axios.get("/products");
            setProducts(data)
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
      <div className='container-fluid'>
        <div className='row box'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <div className='p-3 mt-2 mb-2 h4 bg-light'>Products</div>
            
              {products?.map(product => (
                <Link 
                key={product._id} 
                to={`/dashboard/admin/product/update/${product.slug}`}
                >
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                         alt={product.name}
                         className="img img-fluid rounded-start"
                         />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <div className="card-title">{product.name}</div>
                          <p className="card-text">{`${product?.description?.substring(0, 200)}...`}</p>
                          <p className="card-text">
                            <small className="text-muted">{moment(product.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProducts