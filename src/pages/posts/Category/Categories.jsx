import React, { useEffect } from "react";
import { AiOutlineWallet } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card";
import { fetchCategories } from "../../../store/posts/Category/CategorySlice";
import SingleCategory from "./SingleCategory";
const Categories = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <Card header_text="All Category" icon={<AiOutlineWallet />}>
      {category.categories.length !== 0 ? (
        <ul className=" font-openSans font-semibold flex gap-2 flex-wrap">
          {category.categories.map((item) => {
            return <SingleCategory categoryItem={item} key={item.id} />;
          })}
        </ul>
      ) : (
        ""
      )}
    </Card>
  );
};

export default Categories;
