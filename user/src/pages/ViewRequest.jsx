import { useEffect, useState } from "react";
import { httpRequest } from "../API/api";
import "./CSS/orders.css";
import { useSelector } from "react-redux";

const ViewRequest = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const products = useSelector((state) => state.products.productList);
  const imgPath = useSelector(state => state.common.imagePath);
  const addressArray = useSelector(state => state.address.addressList);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedRow, setSelectedRow] = useState(null);
  const [requestList, setRequestList] = useState([]);

  const toggleAddress = (id) => {
    setSelectedRow(selectedRow === id ? null : id);
  }
//   const cancelOrder = async (e) => {
//     const userConfirmed = window.confirm('Do you want to cancel the order?');
//     if (userConfirmed) {
//       const orderId = e.target.id;
//       try {
//         // httpRequest('get', `api/user/getAddress?userId=${userId}`)
//         const response = await httpRequest('post', `api/order/cancelOrder/${orderId}`);
//         console.log(response);
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId
//               ? { ...order, order_message: "Order Canceled" }
//               : order
//           )
//         );
//         console.log('Order has been cancelled.');
//       } catch (error) {
//         console.log('Error cancelling the order:', error);
//       }
//     } else {
//       console.log('Order cancellation was aborted.');
//     }
//   };
  useEffect(() => {
    httpRequest('get', `api/user/getCaretaking?userId=${userId}`)
      .then((res) => {
        // let orders = res.data;
        setRequestList(res.data)
        console.log(res.data);
        
        // setOrders(ordersWithProductNames);
        setLoading(false); // Mark loading as false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Ensure loading is set to false on error
      });
  }, [userId, products]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator
  }
console.log(requestList);

  return (
    <div className="container">
      {requestList.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="main">
          <div className="right-order">
            {requestList.map((item, index) => {
            //   return (
                <div className="order-container" key={index}>
                  <div className="item-row">
                    <div className="cont">
                      {/* {requestList.map((item, key) => ( */}
                        <div className="item-details">
                          {/* <div className="img"> */}
                            {/* <img src={`${imgPath}${item.image}`} alt={item.name} /> */}
                          {/* </div> */}
                          <div className="order-description">
                            <p>{item.name}</p>
                            <p>{item.phone_no}</p>

                            <p><b>₹</b>{item.status} <b>Qnty-</b>{item.type}</p>
                          </div>
                        </div>
                    {/* //   ))} */}
                    </div>
                    <div className="show-hide">
                      <div className="cancel-order">
                        {/* <p className="err"> {order.order_message}</p> */}
                        {/* {(order.order_message !== "Order Canceled" && order.order_message !== "Delivered") && (
                          <button className="cancel-btn" id={order._id} onClick={(e) => cancelOrder(e)}>Cancel Order</button>
                        )} */}

                      </div>
                      {/* {selectedRow !== order._id ? (
                        <i className="bi bi-chevron-right" onClick={() => toggleAddress(order._id)}></i>
                      ) : (
                        <i className="bi bi-chevron-down" onClick={() => toggleAddress(order._id)}></i>
                      )} */}
                    </div>
                  </div>
                  {/* {selectedRow === order._id && (
                    <div className="deliver-address">
                      <div className="address-left">
                        <div className="address-heading mediumfont">Delivery Address</div>
                        <div className="desc">{address ? address.address : 'Address not found'}</div>
                        <div className="head mediumfont">Phone number</div>
                        <span>{address ? address.mobileNo : 'Phone number not found'}</span>
                      </div>
                      {(order.order_message !== "Order Canceled") && (
                        <div className="address-right">
                          <div className="address-heading mediumfont">More actions</div>
                          <div className="desc"><button>Download Invoice</button></div>
                        </div>
                      )}
                    </div>
                  )} */}
                </div>
            //   );
            })}

          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRequest;
