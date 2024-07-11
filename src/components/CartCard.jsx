import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/reducers/cart.reducer";

const CartCard = ({
  id,
  image,
  price,
  quantity,
  title,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col w-full md:w-[22em] bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-[20em] object-contain" />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-bold text-gray-800">₹ {price}</p>
          <div className="flex items-center">
            <button
              onClick={() => dispatch(cartActions.decreaseQuantity(id))}
              className="w-8 h-8 text-xl text-white bg-slate-500 hover:bg-slate-600 rounded-full flex items-center justify-center"
            >
              -
            </button>
            <p className="text-xl mx-4">{quantity}</p>
            <button
              onClick={() => dispatch(cartActions.increaseQuantity(id))}
              className="w-8 h-8 text-xl text-white bg-slate-500 hover:bg-slate-600 rounded-full flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={() => dispatch(cartActions.removeFromCart(id))}
          className="w-full bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-500"
        >
          Remove From Cart
        </button>
      </div>
    </div>
  );
};

export default CartCard;
