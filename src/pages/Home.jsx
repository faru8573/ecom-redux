import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialItemsThunk,
  itemSelector,
} from "../redux/reducers/item.reducer";
import Card from "../components/Card";
import Filter from "../components/Filter";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialItemsThunk());
  }, [dispatch]);
  const { items } = useSelector(itemSelector);
  // console.log(Array.isArray(items));
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div>
        <Filter />
      </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-4">
        {items.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
