import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  signInUserThunk,
  signUpUserThunk,
} from "../redux/reducers/auth.reducer";

const AuthForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { error } = useSelector(authSelector);

  const dispatch = useDispatch();

  function handleInputChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlSubmit(e) {
    e.preventDefault();
    if (
      formData.email.length === 0 ||
      formData.password === 0 ||
      (isRegistering && formData.username.length === 0)
    ) {
      return;
    }
    if (isRegistering) {
      dispatch(signUpUserThunk(formData));
      setIsRegistering(false);
    } else {
      dispatch(signInUserThunk(formData));
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-xs">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          {isRegistering ? "Sign Up" : "Sign In"}
        </h2>

        <form
          onSubmit={handlSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {isRegistering && (
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isRegistering ? "Sign Up" : "Sign In"}
            </button>
            <a
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={() => setIsRegistering((prev) => !prev)}
            >
              {isRegistering ? "Sign in instead" : "Sign up instead"}
            </a>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
