import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Badge } from "antd";
import {
  FaDiagramProject,
  FaRegClock,
  FaCheck,
  FaTruckMoving,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import moment from "moment";
import toast from "react-hot-toast";

import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";
import { useCart } from "../context/cart";

const ProductView = () => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [cart, setCart] = useCart();

  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params?.slug]);

  // useEffect(() => {
  //   product && loadRelated();
  // }, []);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      loadRelated(data._id, data.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const loadRelated = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `/related-products/${productId}/${categoryId}`
      );
      setRelated(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Jumbotron title="Produck View" />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-9 text-center">
            <div className="card mb-3">
              <Badge.Ribbon text={`${product.sold} sold`} color="red">
                <Badge.Ribbon
                  text={`${product.quantity >= 1
                      ? `${product.quantity - product.sold} in stock`
                      : "Out of stock"
                    }`}
                  placement="start"
                  color={
                    `${product.quantity - product.sold >= 0}` ? "green" : "red"
                  }
                >
                  <img
                    className="card-img-top"
                    src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                    alt={product.name}
                    style={{
                      height: "450px",
                      maxWidth: "25%",
                      objectFit: "content",
                    }}
                  />
                </Badge.Ribbon>
              </Badge.Ribbon>
              <div className="card-body">
                <h1 className="fw-bold">{product?.name}</h1>
                {/* <h4 className="fw-bold">
                  {product?.price?.toLocaleString("pl", {
                    style: "currency",
                    currency: "PLN",
                  })}
                </h4> */}
                <p className="card-text lead">{product?.description}</p>
              </div>
              <div className="d-flex justify-content-between lead bg-light p-5">
                <div style={{ textAlign: "left" }}>
                  <p className="fw-bold">
                    Cena:{" "}
                    {product?.price?.toLocaleString("pl", {
                      style: "currency",
                      currency: "PLN",
                    })}
                  </p>
                  <p className="fw-bold">
                    <FaDiagramProject /> Kategoria: {product?.category?.name}
                  </p>
                  <p>
                    <FaRegClock /> Dodano:{" "}
                    {moment(product?.createdAt).fromNow()}
                  </p>
                  <p>
                    {product?.quantity > 0 ? <FaCheck /> : <MdCancel />}
                    { }{" "}
                    {product?.quantity > 0 ? "w magazynie" : "brak w magazynie"}
                  </p>
                  <p>
                    <FaWarehouse /> dostępne {product?.quantity - product?.sold}
                  </p>
                  <p>
                    <FaRocket /> sprzedane {product?.sold}
                  </p>
                  <p>{product?.shipping && <FaTruckMoving />}</p>
                </div>
              </div>
              <button
                className="btn btn-outline-primary col card-button"
                style={{ borderBottomRightRadius: "5px" }}
                onClick={
                  () => {
                    setCart([...cart, product]);
                    localStorage.setItem('cart', JSON.stringify([...cart, product]));
                    toast.success('Added to cart')
                  }}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <h2>Related products</h2>
            {related?.length < 1 && <p>Nothing found</p>}
            {related?.map(product => (
              <div style={{ maxWidth: '75%' }}>
                <ProductCard
                  product={product}
                  key={product._id}
                />
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
