// import { useDispatch, useSelector } from "react-redux"
// import Categoryslider from "../component/Categoryslider";
// import Produtcard from "../component/Produtcard";
// import "../component/CSS/Card.css"
// import { filterAndStore } from "../Slice/productSlice";
// import { useEffect, useState } from "react";
// const Pets = () => {
//    const dispatch = useDispatch();
//    const [resulArray,setResultArray]=useState([])

//    const categorys = useSelector((state) => state.categorys.categoryList.filter(item => item.mainCategory === "Pet"));
//    const products = useSelector((state) => state.products.productList);
//    const choosenCategory = useSelector((state) => state.categorys.clickedCategory);
//    const filteredProduct = products.filter(product => categorys.some(category => category._id === product.category_id && category.mainCategory === "Pet"));
//    //  console.log(filteredProduct);
//    console.log(choosenCategory);
//    const myProduct = filteredProduct.filter(item => item.category_id === choosenCategory) || null
//    console.log(myProduct);
   
//     (myProduct ===null)? setResultArray(filteredProduct):  setResultArray(myProduct)

//       console.log(filteredProduct.filter(item => item.category_id === choosenCategory));

//    useEffect(() => {
//       dispatch(filterAndStore(resulArray))
//    }, [resulArray])
//    return (
//       <>
//          {/* <Categoryslider categorys={categorys} /> */}
//          {

//             filteredProduct.length === 0 ? "Pets was empty" : <Produtcard categorys={categorys} headding="Our Pets" />
//          }
//       </>
//    )
// }
// export default Pets;
// import { useDispatch, useSelector } from "react-redux";
// import Categoryslider from "../component/Categoryslider";
// import Produtcard from "../component/Produtcard";
// import "../component/CSS/Card.css";
// import { filterAndStore } from "../Slice/productSlice";
// import { useEffect, useState } from "react";

// const Pets = () => {
//    const dispatch = useDispatch();
//    const categorys = useSelector((state) => state.categorys.categoryList.filter(item => item.mainCategory === "Pet"));
//    const products = useSelector((state) => state.products.productList);
//    const choosenCategory = useSelector((state) => state.categorys.clickedCategory);
   
//    const filteredProduct = products.filter(product => categorys.some(category => category._id === product.category_id && category.mainCategory === "Pet"));
   
//    const [resulArray, setResultArray] = useState(filteredProduct);

//    useEffect(() => {
//       if (choosenCategory) {
//          const myProduct = filteredProduct.filter(item => item.category_id === choosenCategory);
//          setResultArray(myProduct);
//       } else {
//          setResultArray(filteredProduct);
//       }
//    }, [filteredProduct, choosenCategory]);

//    useEffect(() => {
//       dispatch(filterAndStore(resulArray));
//    }, [resulArray, dispatch]);

//    return (
//       <>
//          <Categoryslider categorys={categorys} />
//          {
//             resulArray.length === 0 ? "Pets was empty" : <Produtcard categorys={categorys} headding="Our Pets" />
//          }
//       </>
//    );
// };

// export default Pets;
import { useDispatch, useSelector } from "react-redux";
import Categoryslider from "../component/Categoryslider";
import Produtcard from "../component/Produtcard";
import "../component/CSS/Card.css";
import { filterAndStore } from "../Slice/productSlice";
import { useEffect } from "react";
import {setCategoryId} from "../Slice/categorySlice"

const Pets = () => {
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.categorys.categoryList);
  const products = useSelector((state) => state.products.productList);
  const result = useSelector((state) => state.products.filteredProduct);
  const choosenCategory = useSelector((state) => state.categorys.clickedCategory);
  // Use useEffect to filter and dispatch products belonging to the "Pet" category

  useEffect(() => {
    const filteredProduct = products.filter(product =>
      categorys.some(category => category._id === product.category_id && category.mainCategory === "Pet")
    );

    if (choosenCategory) {
      const myProduct = filteredProduct.filter(item => item.category_id === choosenCategory);
      dispatch(filterAndStore(myProduct));
    } else {
      dispatch(filterAndStore(filteredProduct));
    }
  }, [dispatch, categorys, products, choosenCategory]);

  // Filter categories separately (outside useEffect)
  const filterCategory = categorys.filter((itemCat) => itemCat.mainCategory === "Pet");
  // no-product.png
  return (
    <>
      <Categoryslider categorys={filterCategory} />
   { result.length===0 
   ?<div className="noProduct" style={{    "padding": "98px 543px"}}>
    <img src="images/no-product.png" alt="no-product" />
   </div>

   : <Produtcard categorys={filterCategory} headding="Our Pets" />}
    </>
  );
};

export default Pets;
