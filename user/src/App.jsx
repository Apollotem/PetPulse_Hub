import AllRouter from "./AllRoutes";
import Navbar from "./component/Navbar";
// import Navbartop from "./component/Navbartop";
import { useDispatch } from "react-redux"
import { fetchAndStore } from "./Slice/productSlice"
import { useEffect,useState } from "react";
import { httpRequest } from "./API/api"
import { fetchAndStoreCategory } from "./Slice/categorySlice"
import Chatbot from "./component/Chatbot"
import Cart from "./pages/Cart";

// import Toplinks from "./component/Toplinks";
 import Footer from "./component/Footer"
const App = () => {
  const dispatch = useDispatch();
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false); // State for cart visibility

  useEffect(() => {
    // Fetching categories
    httpRequest('get', 'api/category')
      .then(data => {
        if (data && Array.isArray(data.categoryDetails)) {
          dispatch(fetchAndStoreCategory(data.categoryDetails));
        } else {
          console.error("Fetched data does not contain 'categoryDetails' array:", data);
        }
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });

    // Fetching products
    httpRequest('get', 'api/product')
      .then(data => {
        if (data && Array.isArray(data.productDetails)) {
          dispatch(fetchAndStore(data.productDetails));
        } else {
          console.error("Fetched data does not contain 'productDetails' array:", data);
        }
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);
  const handleChatbotClick = () => {
    setIsChatbotVisible(true); // Show the chatbot
  };

  const handleChatbotClose = () => {
    setIsChatbotVisible(false); // Hide the chatbot
  };
  const toggleCartVisibility = () => {
    setCartVisible(!isCartVisible); // Toggle cart visibility
  };
  return (
    <>
      {/* <Toplinks /> */}
      <Navbar onCartClick={toggleCartVisibility}/>
      {/* <Navbartop/> */}
      <AllRouter />
      <Footer/>
      <div className="chatbot-icon" onClick={handleChatbotClick}>
        <img
          src="./images/ai.png"
          alt="chatbot" />
      </div>

      {isChatbotVisible && (
        <div className="chatbot-modal">
          <div className="chatbot-overlay" onClick={handleChatbotClose}></div>
          <div className="chatbot-content">
            <Chatbot onClose={handleChatbotClose} />
          </div>
        </div>
      )}
       {isCartVisible && (
        <Cart callbackShowCart={toggleCartVisibility} />
      )}
    </>
  );
}
export default App;
