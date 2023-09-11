import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import Jumbotron from "../components/cards/Jumbotron";
import HorizontaProductCard from "../components/cards/HorizontaProductCard";
import SummaryForCart from "../components/cards/SummaryForCart";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.token && auth?.user?.name}`}
        subtitle={
          cart?.length
            ? `You have ${cart?.length} items in cart. ${
                auth?.token ? "" : "Please login to checkout"
              }`
            : "Your cart is empty"
        }
      />
      <div className="container-fluid">
        <div className="row box">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {cart?.length ? (
                `My Cart`
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {cart?.length && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {cart?.map((product) => (
                  <HorizontaProductCard 
                  product={product} 
                  key={nanoid()} 
                  />
                ))}
              </div>
            </div>
            <SummaryForCart />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
