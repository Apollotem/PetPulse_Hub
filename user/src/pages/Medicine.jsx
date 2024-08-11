// import { useSelector,useDispatch } from "react-redux";
// import Produtcard from "../component/Produtcard"
// import {filterAndStore} from "../Slice/productSlice"

// const Medicine=()=>{
//     const dispatch = useDispatch();
//     const categorys=useSelector((state)=>state.categorys.categoryList);
//     const products = useSelector((state) => state.products.productList);
//     const filterCategory=categorys.filter((itemCat)=>itemCat.mainCategory==="Medicine" && products.some((productItem)=>productItem.category_id===itemCat._id ));
//     const filteredProduct=products.filter(product=>categorys.some(category=>category._id===product.category_id && category.mainCategory==="Medicine"));
//     dispatch(filterAndStore(filteredProduct));
//     return(
//        <>
//         { filteredProduct.length===0?"Medicine was empty":<Produtcard categorys={filterCategory} headding="Our Medicine"/>  }
//        </>
//     );
// }
// export default Medicine;

import { useDispatch, useSelector } from "react-redux";
import Categoryslider from "../component/Categoryslider";
import Produtcard from "../component/Produtcard";
import "../component/CSS/Card.css";
import { filterAndStore } from "../Slice/productSlice";
import { useEffect } from "react";

const Accessorys = () => {
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.categorys.categoryList);
  const products = useSelector((state) => state.products.productList);
  const result = useSelector((state) => state.products.filteredProduct);
  const choosenCategory = useSelector((state) => state.categorys.clickedCategory);

  // Use useEffect to filter and dispatch products belonging to the "Pet" category
  useEffect(() => {
    const filteredProduct = products.filter(product =>
      categorys.some(category => category._id === product.category_id && category.mainCategory === "Medicine")
    );

    if (choosenCategory) {
      const myProduct = filteredProduct.filter(item => item.category_id === choosenCategory);
      dispatch(filterAndStore(myProduct));
    } else {
      dispatch(filterAndStore(filteredProduct));
    }
  }, [dispatch, categorys, products, choosenCategory]);

  // Filter categories separately (outside useEffect)
  const filterCategory = categorys.filter((itemCat) => itemCat.mainCategory === "Medicine");

  return (
    <>
      <Categoryslider categorys={filterCategory} />
   { result.length===0 ?"Product was empty": <Produtcard categorys={filterCategory} headding="Top Accessorys" />}
    </>
  );
};

export default Accessorys;
