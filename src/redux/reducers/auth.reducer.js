import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const initialState = {
  isAuthenticate: localStorage.getItem("isAuthenticate") === "true" || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: "",
};

export const signUpUserThunk = createAsyncThunk(
  "signup/user",
  async (userCredential, thunAPI) => {
    try {
      const { email, password } = userCredential;
      const user = await createUserWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      console.log("error while registering user", error);
      thunAPI.dispatch(authActions.setError(error.message));
      return thunAPI.rejectWithValue(
        "Something went wrong, please try again later"
      );
    }
  }
);

export const signInUserThunk = createAsyncThunk(
  "signin/user",
  async (userCredential, thunkAPI) => {
    try {
      const { email, password } = userCredential;
      const user = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      console.log("error while sign in user", error);
      thunkAPI.dispatch(authActions.setError(error.message));
      return thunkAPI.rejectWithValue(
        "Something went wrong, please try again later"
      );
    }
  }
);

export const logOutUserThunk = createAsyncThunk(
  "logout/user",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      thunkAPI.dispatch(authActions.clearAuth());
    } catch (error) {
      console.log("error while sign out user", error);
      thunkAPI.dispatch(authActions.setError(error.message));
      return thunkAPI.rejectWithValue(
        "Something went wrong, please try again later"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuthenticate = action.payload.isAuthenticate;
      state.user = action.payload.user;
    },
    clearAuth: (state, action) => {
      state.isAuthenticate = false;
      state.user = null;
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserThunk.fulfilled, (state, action) => {
        state.isAuthenticate = true;
        state.user = action.payload;
        localStorage.setItem("isAuthenticate", true);
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signInUserThunk.fulfilled, (state, action) => {
        state.isAuthenticate = true;
        state.user = action.payload;
        localStorage.setItem("isAuthenticate", true);
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(logOutUserThunk.fulfilled, (state, action) => {
        state.isAuthenticate = false;
        state.user = null;
        localStorage.removeItem("isAuthenticate");
        localStorage.removeItem("user");
      });
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const authSelector = (state) => state.auth;
