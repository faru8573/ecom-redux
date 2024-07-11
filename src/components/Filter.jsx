import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { itemActions } from "../redux/reducers/item.reducer";

const Filter = () => {
  const [filterPrice, setFilterPrice] = useState(0);
  const [category, setCategory] = useState({
    "men's clothing": false,
    "women's clothing": false,
    jewelery: false,
    electronics: false,
  });

  const dispatch = useDispatch();

  function handlePriceFilter(e) {
    const price = Number(e.target.value);
    setFilterPrice(price);
    dispatch(itemActions.filterItemByPrice(price));
  }

  function handleCategoryFilter(e) {
    const { name, checked } = e.target;

    setCategory((prev) => ({ ...prev, [name]: checked }));
  }

  useEffect(() => {
    const selectedCategories = Object.keys(category).filter(
      (key) => category[key]
    );

    dispatch(itemActions.filterItemByCategory(selectedCategories));
  }, [category, dispatch]);

  return (
    <div className="p-4 rounded shadow-lg w-full md:w-64">
      <h2 className="text-xl font-bold mb-4">Filter</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <input
          onChange={(e) => handlePriceFilter(e)}
          type="range"
          min="1"
          max="99999"
          className="w-full"
          value={filterPrice}
        />
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          <span>₹ 0</span>
          <span>${filterPrice}</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Category</h3>
        <div className="flex flex-col space-y-2">
          <label className="inline-flex items-center">
            <input
              onChange={handleCategoryFilter}
              type="checkbox"
              className="form-checkbox text-blue-600"
              name="men's clothing"
              checked={category["men's clothing"]}
            />
            <span className="ml-2">Men's Clothing</span>
          </label>
          <label className="inline-flex items-center">
            <input
              onChange={handleCategoryFilter}
              type="checkbox"
              className="form-checkbox text-blue-600"
              name="women's clothing"
              checked={category["women's clothing"]}
            />
            <span className="ml-2">Women's Clothing</span>
          </label>
          <label className="inline-flex items-center">
            <input
              onChange={handleCategoryFilter}
              type="checkbox"
              className="form-checkbox text-blue-600"
              name="jewelery"
              checked={category.jewelery}
            />
            <span className="ml-2">Jewelery</span>
          </label>
          <label className="inline-flex items-center">
            <input
              onChange={handleCategoryFilter}
              type="checkbox"
              className="form-checkbox text-blue-600"
              name="electronics"
              checked={category.electronics}
            />
            <span className="ml-2">Electronics</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
