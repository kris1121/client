import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../../context/cart";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();
  const [cart, setCart] = useCart();


  return (
    <div className="card mb-3 hoverable">
      <Badge.Ribbon text={`${product.sold} sold`} color="red">
        <Badge.Ribbon
          text={`${product.quantity >= 1 ? `${product.quantity - product.sold} in stock` : 'Out of stock'}`}
          placement="start"
          color={`${product.quantity - product.sold >= 0}` ? "green" : "red"}
        >
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
            alt={product.name}
            style={{ height: "280px", objectFit: "fit" }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>
      <div className="card-body">
        <h5>{product?.name}</h5>
        <h4 className="fw-bold">{product?.price?.toLocaleString("pl", {
          style: 'currency',
          currency: "PLN"
        })}</h4>
        <p className="card-text">{product?.description.substring(0, 60)}...</p>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary col card-button"
          style={{ borderBottomLeftRadius: "5px" }}
          onClick={() => navigate(`/product/${product.slug}`)}
        >
          View Product
        </button>
        <button
          className="btn btn-outline-primary col card-button"
          style={{ borderBottomRightRadius: "5px" }}
          onClick={
            () => {
              setCart([...cart, product]);
              localStorage.setItem('cart', JSON.stringify([...cart, product]));
              toast.success('Added to cart');
            }}
        >
          Add to Cart
        </button>
      </div>

      {/* <p>{moment(product.createdAt).fromNow()}</p>
      <p>{product.sold}</p> */}
    </div>
  );
};

export default ProductCard;
