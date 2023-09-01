import { useCart } from "../../context/cart";

const SummaryForCart = () => {
  const [cart, setCart] = useCart();

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

  return (
    <div className="col-md-4">
      <h4>Your cart summary</h4>
      Total / Address / Payments
      <hr />
      <h6>Total: {cartTotal()}</h6>
    </div>
  );
};

export default SummaryForCart;
