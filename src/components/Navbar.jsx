import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { authSelector, logOutUserThunk } from "../redux/reducers/auth.reducer";

const Navbar = () => {
  const { isAuthenticate } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUserThunk());
  };

  return (
    <div className="min-h-screen">
      <div className="flex h-[80px] bg-blue-700 text-gray-300 fixed top-0 w-full px-2 z-10">
        <div className="container h-full mx-auto flex items-center justify-between">
          <Link to={"/"}>
            <div className="text-2xl font-extrabold">BUSY BUY</div>
          </Link>
          <div className="flex gap-4 items-center">
            <Link to={"/"}>
              <div className="hover:text-gray-400 cursor-pointer">Home</div>
            </Link>
            {isAuthenticate ? (
              <>
                <Link to="/orders">
                  <div className="hover:text-gray-400 cursor-pointer">
                    My Orders
                  </div>
                </Link>
                <Link to={"/cart"}>
                  <div className="hover:text-gray-400 cursor-pointer relative">
                    <p>Cart</p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-400 cursor-pointer"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link to={"/auth"}>
                <div className="hover:text-gray-400 cursor-pointer">
                  Sign in
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-[6em]">
        <Toaster position="top-center" reverseOrder={false} />
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
