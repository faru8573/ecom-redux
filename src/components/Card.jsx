import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/reducers/cart.reducer";
import { authSelector } from "../redux/reducers/auth.reducer";
import { useNavigate } from "react-router-dom";

const Card = ({ id, title, image, price }) => {
  const { isAuthenticate } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAddToCart() {
    if (!isAuthenticate) {
      alert("You need to sign in to add items to the cart.");
      navigate("/auth");
      return;
    }

    dispatch(cartActions.addToCart({ id, title, image, price }));
  }

  return (
    <div className="flex flex-col w-full md:w-[20em] bg-white rounded-lg shadow-lg overflow-hidden justify-between mb-4 transition transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-[15em] object-contain" />
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-green-500 text-xl font-bold mb-4">₹ {price}</p>
        </div>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded w-full"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
