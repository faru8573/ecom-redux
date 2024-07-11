import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs } from "firebase/firestore";
import { database } from "../../firebase/firebase.config";

const initialState = {
  items: [],
  originalItems: [],
  error: "",
};

export const getInitialItemsThunk = createAsyncThunk(
  "get/items",
  async (_, thunkApi) => {
    try {
      const querySnapshot = await getDocs(collection(database, "items"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return items;
    } catch (error) {
      console.log("error while fetching items from DB", error);
      return thunkApi.rejectWithValue("error while fetching items");
    }
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setInitialItems: (state, action) => {
      state.items = action.payload;
      state.originalItems = action.payload;
      console.log(state.originalItems);
    },
    filterItemByPrice: (state, action) => {
      const filteredItems = state.originalItems.filter(
        (item) => item.price >= action.payload
      );

      state.items = filteredItems;
    },
    filterItemByCategory: (state, action) => {
      const categories = action.payload;
      // categories length 0 hone se original items set kar diya
      if (categories.length > 0) {
        const catFiltered = state.originalItems.filter((item) =>
          categories.some((category) => item.category.includes(category))
        );
        state.items = catFiltered;
      } else {
        state.items = state.originalItems;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getInitialItemsThunk.fulfilled, (state, action) => {
      state.items = action.payload;
      state.originalItems = action.payload;
    });
  },
});

export const itemReducer = itemSlice.reducer;
export const itemActions = itemSlice.actions;
export const itemSelector = (state) => state.items;
