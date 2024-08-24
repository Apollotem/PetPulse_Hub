// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { filterAndStore } from "../Slice/productSlice";
// import Produtcard from "../component/Produtcard";
// import Categoryslider from "../component/Categoryslider";

// const Foods = () => {
//   const dispatch = useDispatch();
//   const categorys = useSelector((state) => state.categorys.categoryList);
//   const products = useSelector((state) => state.products.productList);

//   // Use useEffect to dispatch the action after component has mounted
//   useEffect(() => {
//     const filteredProduct = products.filter(product =>
//       categorys.some(category => category._id === product.category_id && category.mainCategory === "Food")
//     );
//     dispatch(filterAndStore(filteredProduct));
//   }, [dispatch, categorys, products]);

//   // Filter categories separately (outside useEffect)
//   const filterCategory = categorys.filter((itemCat) => itemCat.mainCategory === "Food");
//   return (
//     <>
//       <Categoryslider categorys={filterCategory} />
//       <Produtcard categorys={filterCategory}   headding="Our Top Food Items" />
//     </>
//   );
// };

// export default Foods;
import { useDispatch, useSelector } from "react-redux";
import Categoryslider from "../component/Categoryslider";
import Produtcard from "../component/Produtcard";
import "../component/CSS/Card.css";
import { filterAndStore } from "../Slice/productSlice";
import { useEffect } from "react";

const Foods = () => {
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.categorys.categoryList);
  const products = useSelector((state) => state.products.productList);
  const result = useSelector((state) => state.products.filteredProduct);
  const choosenCategory = useSelector((state) => state.categorys.clickedCategory);

  // Use useEffect to filter and dispatch products belonging to the "Pet" category
  useEffect(() => {
    const filteredProduct = products.filter(product =>
      categorys.some(category => category._id === product.category_id && category.mainCategory === "Food")
    );

    if (choosenCategory) {
      const myProduct = filteredProduct.filter(item => item.category_id === choosenCategory);
      dispatch(filterAndStore(myProduct));
    } else {
      dispatch(filterAndStore(filteredProduct));
    }
  }, [dispatch, categorys, products, choosenCategory]);

  // Filter categories separately (outside useEffect)
  const filterCategory = categorys.filter((itemCat) => itemCat.mainCategory === "Food");

  return (
    <>
      <Categoryslider categorys={filterCategory} />
   { result.length===0 ?<div className="noProduct" style={{    "padding": "98px 543px"}}>
    <img src="images/no-product.png" alt="no-product" />
   </div>: <Produtcard categorys={filterCategory} headding="Top Fooods" />}
    </>
  );
};

export default Foods;
