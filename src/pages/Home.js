import axios from "axios";
import { useEffect, useState } from "react";

import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page])

  const getTotal = async () => {
    try {
      const { data } = await axios.get('products-count');
      setTotal(data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      if (data) setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      if (data) setProducts([...products, ...data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return (
    <div>
      <Jumbotron title="Hello World" subtitle="Welcome to React e-commerce" />
      <div className="row">
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
            New Arrivals
          </h2>
          <div className="row">
            {products?.map((product) => (
              <div className="col-md-6 col-lg-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
            Best Sellers
          </h2>
          <div className="row">
            {sortedBySold?.map((product) => (
              <div className="col-md-6 col-lg-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container text-center p-5">
        {products && products.length < total && (
          <button 
          className="btn btn-warning btn-lg"
          disabled={loading}
          onClick={e => {
            e.preventDefault();
            setPage(page + 1);
          }}
          >
            {loading ? 'Loading...' : 'Load more'}
            </button>
        )}
      </div>
    </div>
  );
};

export default Home;
