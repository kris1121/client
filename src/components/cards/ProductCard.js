import moment from "moment";
import { Badge } from "antd";

const ProductCard = ({ product }) => {
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
            style={{ height: "300px", objectFit: "fit" }}
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
        >
          View Product
        </button>
        <button
          className="btn btn-outline-primary col card-button"
          style={{ borderBottomRightRadius: "5px" }}
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
