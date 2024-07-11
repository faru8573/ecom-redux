import React, { useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import CartPage from "./pages/Cart";
import OrdersPage from "./pages/Orders";
import AuthPage from "./pages/Auth";
import { useSelector } from "react-redux";
import { authSelector } from "./redux/reducers/auth.reducer";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticate } = useSelector(authSelector);

  useEffect(() => {
    if (!isAuthenticate) {
      navigate("/auth");
    }
  }, [isAuthenticate, navigate]);

  return isAuthenticate ? children : null;
}

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "orders",
          element: (
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          ),
        },
        { path: "auth", element: <AuthPage /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
