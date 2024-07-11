import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cartSelector } from "../redux/reducers/cart.reducer";

const OrdersPage = () => {
  // const cartItems = useSelector(cartSelector);
  const [items, setItems] = useState([]);
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const orderedItems =
      JSON.parse(localStorage.getItem("savedCartItems")) || [];
    setItems(orderedItems);
    console.log(items);
  }, []);

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <p className="text-3xl font-bold">Your Orders</p>
        <p className="text-lg text-gray-500">Ordered On: {currentDate}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Title
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Price
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Quantity
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4">₹ {item.price.toFixed(2)}</td>
                <td className="py-3 px-4">{item.quantity}</td>
                <td className="py-3 px-4">
                  ₹ {(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="border-t bg-gray-100">
              <td colSpan="3" className="py-3 px-4 text-right font-semibold">
                Total Amount
              </td>
              <td className="py-3 px-4 font-semibold">
                ₹ {totalAmount.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
