// import { useEffect, useRef, useState } from "react";
// import { httpRequest } from "../API/api";
// import { useSelector } from "react-redux";


// const Order = () => {
//     const tableHeadding = [
//         { th: "#id" },
//         { th: "Name" },
//         { th: "addressId" },
//         { th: "tAmount" },
//         { th: "Mode" },
//         { th: "Date" },
//         { th: "message" },
//         { th: "status" },
//         { th: "Action" },
//     ];
//     const [orders, setOrders] = useState([]);
//     const visibility = useSelector((state) => state.visibility.visibility);
//     const [orderUpdate, setOrderUpdate] = useState(false);
//     const [orderId, setOrderId] = useState();
//     const messsageRef = useRef(null);

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const fetchOrders = () => {
//         httpRequest('get', 'api/order/all')
//             .then((res) => {
//                 setOrders(res.data);
//             })
//             .catch((err) => console.log(err));
//     };

//     const updateOrderStatus = () => {
//         const data = {
//             "id": orderId,
//             "order_message": messsageRef.current.value
//         };
//         httpRequest('post', 'api/order/updateStatus', data)
//             .then((res) => {
//                 setOrderUpdate(false);
//                 // Update the order in the state
//                 setOrders(prevOrders =>
//                     prevOrders.map(order =>
//                         order._id === orderId ? { ...order, order_message: data.order_message } : order
//                     )
//                 );
//             })
//             .catch((err) => console.log(err));
//     };

//     const handleEditing = (id) => {
//         setOrderId(id);
//         setOrderUpdate(true);
//     };

//     return (
//         <div className={visibility ? "flat-container" : "content-div"}>
//             <div className="card-header">
//                 <div className="card-headding main-menu-headding">Order Details</div>
//                 <div className="top-button"></div>
//             </div>
//             <table className="table-container table">
//                 <thead>
//                     <tr className="table-headding">
//                         {tableHeadding.map((eachHeadding, id) => (
//                             <td key={id}>{eachHeadding.th}</td>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map((order, id) => (
//                         <tr key={id} scope="row">
//                             <td>{id + 1}</td>
//                             <td>{order.userId}</td>
//                             <td>{order.addressId}</td>
//                             <td>{order.totelamount}</td>
//                             <td>{order.paymentMode}</td>
//                             <td>{order.dateOfOrder}</td>
//                             <td>{order.order_message}</td>
//                             <td>{order.status}</td>
//                             <td onClick={() => handleEditing(order._id)} id={order._id}>
//                                 <i className="bi bi-pencil-square"></i>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {orderUpdate &&
//                 <div className="update-status">
//                     <div className="box-title"><h5 className="modal-title">Update Order</h5></div> <hr />
//                     <div className="body">
//                         <select ref={messsageRef}>
//                             <option value="Order Placed">Order Placed</option>
//                             <option value="Shipped">Shipped</option>
//                             <option value="Out For Deliver">Out For Deliver</option>
//                             <option value="Delivered">Delivered</option>
//                         </select>
//                     </div> <hr />
//                     <div className="footer">
//                         <button className="gray-btn footer-btn" onClick={() => setOrderUpdate(false)}>Cancel</button>
//                         <button className="footer-btn" onClick={updateOrderStatus}>Update</button>
//                     </div>
//                 </div>
//             }
//         </div>
//     );
// }

// export default Order;
import React, { useEffect, useRef, useState } from "react";
import { httpRequest } from "../API/api";
import { useSelector } from "react-redux";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Order = () => {
    const [orders, setOrders] = useState([]);
    const visibility = useSelector((state) => state.visibility.visibility);
    const [orderUpdate, setOrderUpdate] = useState(false);
    const [orderId, setOrderId] = useState();
    const messsageRef = useRef(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const [loading, setLoading] = useState(true); // To handle loading state
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' }, // Adjust as needed
    });
    const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        setLoading(true);
        httpRequest('get', 'api/order/all')
            .then((res) => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const updateOrderStatus = () => {
        const data = {
            id: orderId,
            order_message: messsageRef.current.value,
        };
        httpRequest('post', 'api/order/updateStatus', data)
            .then((res) => {
                setOrderUpdate(false);
                // Update the order in the state
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, order_message: data.order_message } : order
                    )
                );
            })
            .catch((err) => console.log(err));
    };
    const addressIdTemplate = (rowData) => {
        return (
            <span 
                style={{ color: 'blue', cursor: 'pointer' }} 
                onClick={() => navigate(`/addresses/${rowData.addressId}`)} // Navigate to Address component with addressId
            >
                {rowData.addressId}
            </span>
        );
    };

    const handleEditing = (id) => {
        setOrderId(id);
        setOrderUpdate(true);
    };

    // Function to render the SL No.
    const slNoTemplate = (rowData, { rowIndex }) => {
        return rowIndex + 1; // SL No. starts from 1
    };

    // Function to determine the status style
    const statusTemplate = (rowData) => {
        let style = {};
        if (rowData.status === 'success') {
            style = { color: 'green' };
        } else if (rowData.status === 'pending') {
            style = { color: 'yellow' };
        }
        return <span style={style}>{rowData.status}</span>;
    };
    const messageTemplate=(rowData)=>{
        let style = {};
         if (rowData.order_message === 'Out For Deliver') {
            style = { color: 'orange' };
        } else if (rowData.order_message === 'Delivered') {
            style = { color: 'green' };
        } else if (rowData.order_message === 'Shipped') {
            style = { color: 'yellow' };
        } else if (rowData.order_message === 'Order Cancel') {
            style = { color: 'red' };
        }
        return <span style={style}>{rowData.order_message}</span>;

    }

    const header = (
        <div className="flex justify-content-between">
            <div className="flex align-items-center gap-2">
                <span>Show</span>
                <Dropdown 
                    value={rowsPerPage} 
                    options={[5, 10, 15]} 
                    onChange={(e) => setRowsPerPage(e.value)} 
                    placeholder="Select Rows" 
                    className="p-dropdown"
                />
                <span>records</span>
                <InputText 
                    placeholder="Search..." 
                    onInput={(e) => setFilters({ ...filters, global: { value: e.target.value, matchMode: 'contains' } })} 
                />
            </div>
        </div>
    );

    return (
        <div className={visibility ? "flat-container" : "content-div"}>
            <div className="card-header">
                <h5>Order Details</h5>
            </div>

            <DataTable 
                value={orders} 
                paginator 
                rows={rowsPerPage} 
                loading={loading}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                header={header}
                emptyMessage="No orders found."
                globalFilterFields={['userId', 'addressId', 'totelamount', 'paymentMode', 'dateOfOrder', 'order_message', 'status']}
            >
                <Column body={slNoTemplate} header="SL No." style={{ width: '50px' }} />
                <Column field="_id" header="#id" />
                {/* <Column field="addressId" header="Address ID" /> */}
                <Column body={addressIdTemplate} header="Address ID" /> 
                <Column field="totelamount" header="Total Amount" />
                <Column field="paymentMode" header="Mode" />
                <Column field="dateOfOrder" header="Date" />
                <Column  body={messageTemplate}  header="Message" />
                <Column body={statusTemplate} header="Status" />
                <Column 
                    body={(rowData) => (
                        <i className="bi bi-pencil-square" onClick={() => handleEditing(rowData._id)}></i>
                    )} 
                    header="Action" 
                />
            </DataTable>

            {orderUpdate && (
                <div className="update-status">
                    <div className="box-title"><h5 className="modal-title">Update Order</h5></div> 
                    <hr />
                    <div className="body">
                        <select ref={messsageRef}>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out For Deliver">Out For Deliver</option>
                            <option value="Delivered">Delivered</option>
                            {/* <option value="Order Cancel">Order Cancel</option> Add this option */}
                        </select>
                    </div> 
                    <hr />
                    <div className="footer">
                        <button className="gray-btn footer-btn" onClick={() => setOrderUpdate(false)}>Cancel</button>
                        <button className="footer-btn" onClick={updateOrderStatus}>Update</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;
