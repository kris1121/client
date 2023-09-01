import React from 'react'

import { useCart } from '../../context/cart'
import Jumbotron from '../../components/cards/Jumbotron'

const Cart = () => {
  const [cart, setCart] = useCart();
  return (
    <>
    <Jumbotron title="Cart" subtitle={`cart has ${cart?.length} items`} />
    <div>
      Cart
    </div>
    </>
  )
}

export default Cart
