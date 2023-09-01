import React from "react";
import moment from "moment";

import { useCart } from "../../context/cart";

const HorizontaProductCard = ({ product }) => {
  const [cart, setCart] = useCart();

  const removeFromCart = (productId) => {
    let index = cart.findIndex((item) => item._id === productId);
    let newCart = [...cart];
    newCart.splice(index, 1);
    setCart([...newCart]);
    localStorage.setItem("cart", JSON.stringify([...newCart]));
    };

  return (
    <div className="card mb-3" style={{ maxWidth: 540 }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
            alt={product.name}
            style={{
              height: "180px",
              objectFit: "cover",
              marginLeft: "-12px",
              borderTopRightRadius: "0px",
            }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h4 className="card-title">{product.name}</h4>
              <h5 className="fw-bold" style={{ marginTop: "5px" }}>
                {product?.price?.toLocaleString("pl", {
                  style: "currency",
                  currency: "PLN",
                })}
              </h5>
            </div>

            <p className="card-text">{`${product?.description?.substring(
              0,
              50
            )}...`}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="card-text">
              <small className="text-muted">
                Listed {moment(product.createdAt).fromNow()}
              </small>
            </p>
            <button
              className="btn btm-sm btn-outline-danger mb-2"
              onClick={() => removeFromCart(product._id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontaProductCard;
