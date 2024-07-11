import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, cartSelector } from "../redux/reducers/cart.reducer";
import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector(cartSelector);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const handlePurchase = () => {
    localStorage.setItem("savedCartItems", JSON.stringify(cartItems));
    dispatch(cartActions.clearCartItems());
    navigate("/orders");
  };

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 min-h-screen p-4">
      <div className="w-full flex flex-col justify-center items-center shadow-md bg-white p-6 rounded-lg">
        {cartItems.length > 0 ? (
          <>
            <div className="w-full flex flex-col items-center mb-4">
              <div className="text-2xl font-semibold mb-2">
                Total Price:{" "}
                <span className="text-green-500 font-bold">
                  ₹ {totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handlePurchase}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full max-w-xs"
              >
                Purchase
              </button>
            </div>
            <div className="w-full flex flex-col md:flex-row flex-wrap gap-4">
              {cartItems.map((item) => (
                <CartCard key={item.id} {...item} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-4xl font-extrabold">Cart is Empty</div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
