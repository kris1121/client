import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";

const SummaryForCart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get('/braintree/token');
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error)
    }
  }


  const cartTotal = () => {
    let total = 0;
    cart?.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("pl", {
      style: "currency",
      currency: "PLN",
    });
  };

  const handleBuy = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      // console.log('nonce =>', nonce)
      const { data } = await axios.post('/braintree/payment', {
        nonce,
        cart,
      });
      // console.log('handle buy response =>', data)
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders');
      toast.success('Payment successful')
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="col-md-4">
      <h4>Your cart summary</h4>
      Total / Address / Payments
      <hr />
      <h6>Total: {cartTotal()}</h6>
      {auth?.user?.address ? (
        <>
          <div className="mb-3">
            <hr />
            <h4>Delivery address:</h4>
            <h5>{auth.user.address}</h5>
          </div>
          <button
            className="btn btn-outline-warning mt-3"
            onClick={() => navigate('/dashboard/user/profile')}
          >
            Update address
          </button>
        </>
      ) : (
        <div className="mb-3">
          {auth?.token ? (
            <button
              className="btn btn-outline-warning mt-3"
              onClick={() => navigate('/dashboard/user/profile')}
            >Add delivery address</button>
          ) : (
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() => navigate('/login', { state: '/cart' })}
            >
              Login to checkout
            </button>
          )}
        </div>
      )}
      {!clientToken || !cart?.length ? (
        ''
      ) : (
        <div><DropIn options={{
          authorization: clientToken,
          paypal: {
            "flow": "vault"
          }
        }} 
        onInstance={instance => setInstance(instance)}
        />
        <button 
        onClick={handleBuy} 
        className="btn btn-primary col-12 mb-3"
        disabled={!auth?.user?.address || !instance || loading}
        >{loading ? "Processing..." : "Buy"}</button>
        </div>
      )}
    </div>
  );
};

export default SummaryForCart;
