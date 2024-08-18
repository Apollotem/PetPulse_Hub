// import { useCart } from "react-use-cart";
// const ButtonComponent = ({
//   classs,
//   product,
//   text,
//   viewProduct,
//   checkOut,
//   onClick,
//   orderConfirmation,
//   disableValue
// }) => {
//   const { addItem } = useCart();
//   return (
//     <>
//       <button
      
//         onClick={() => {
//           if (viewProduct || checkOut || orderConfirmation) {
//             if (onClick) onClick();
//           } else {
//             let tmpProduct = JSON.parse(JSON.stringify(product));
//             tmpProduct.id = product._id;
//             tmpProduct.price = product.newPrice;
//             // console.log(tmpProduct);
//             addItem(tmpProduct, 1);
//             if (onClick) onClick();
//           }
//         }}
//         className={classs}
//         disabled={disableValue}>
//         {text}
//       </button>
//     </>
//   );
// };
// export default ButtonComponent;
import React, { useState } from 'react';
import { useCart } from "react-use-cart";

const ButtonComponent = ({
  classs,
  product,
  text,
  viewProduct,
  checkOut,
  onClick,
  orderConfirmation,
  disableValue
}) => {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);  // Start the loader
    try {
      if (viewProduct || checkOut || orderConfirmation) {
        if (onClick) await onClick();  // Execute the passed onClick function
      } else {
        let tmpProduct = JSON.parse(JSON.stringify(product));
        tmpProduct.id = product._id;
        tmpProduct.price = product.newPrice;
        addItem(tmpProduct, 1);
        if (onClick) await onClick();  // Execute the passed onClick function
      }
    } catch (error) {
      console.error("An error occurred:", error);  // Handle any potential errors
    } finally {
      setLoading(false);  // Stop the loader after everything is done
    }
  };
  // const handleClick = async () => {
  //   setLoading(true);
  //   try {
  //     if (viewProduct || checkOut || orderConfirmation) {
  //       if (onClick) await onClick();
  //     } else {
  //       let tmpProduct = JSON.parse(JSON.stringify(product));
  //       tmpProduct.id = product._id;
  //       tmpProduct.price = product.newPrice;
  //       addItem(tmpProduct, 1);
  //       if (onClick) await onClick();
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <button
        onClick={handleClick}
        className={classs}
        disabled={disableValue || loading}
      >
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          text
        )}
      </button>
    </>
  );
};

export default ButtonComponent;
