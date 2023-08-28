import axios from "axios";
import { useEffect, useState } from "react";

import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      if (data) setProducts(data);
    } catch (error) {
      console.log(error);
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
    </div>
  );
};

export default Home;
