import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";

const CategoryView = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) loadProductsByCategory();
  }, [params?.slug]);

  const loadProductsByCategory = async () => {
    try {
      const { data } = await axios.get(`/products-by-category/${params.slug}`);
      setProducts(data.products);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Jumbotron
        title={category?.name}
        subtitle={`${products?.length} products found in category`}
      />
      <div className="container-fluid">
        <div className="row mt-3">
          {products?.map(product => (
            <div className="col-md-2" key={product._id}>
              <ProductCard
                product={product}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CategoryView
