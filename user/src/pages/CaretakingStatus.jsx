import React,{ useEffect, useState } from "react";
import { httpRequest } from "../API/api";
import { useSelector } from 'react-redux';
const CaretakingStatus = () => {
    const userId = localStorage.getItem("userId")
    const [caretakingList, setCaretakingList] = useState([]);
    const [expandedRowId, setExpandedRowId] = useState(null);
const imagePath=useSelector(state=>state.common.imagePath)
    useEffect(() => {
        httpRequest('get', `api/user/getCaretaking?userId=${userId}`)
            .then((res) => {
                setCaretakingList(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, [userId]);

    const toggleExpandRow = (id) => {
        setExpandedRowId(expandedRowId === id ? null : id);
    };

    const handleCancel = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');

        if (confirmDelete) {
            httpRequest('post', "api/user/updateCaretakeStatus", { id: id ,status:"Canceled"})
                .then((res) => {
                    if (res.status === "success") {
                        let a = caretakingList.map(data => data._id === id ? { ...data, status: "Canceled" } : data)
                        setCaretakingList(a)

                    }
                })
        }
    };

    return (
        <div>
            {caretakingList.length === 0 ? (
                "Service request is empty"
            ) : (
                <div className="pet-requests-container">
                    <h2>Pet Request Details</h2>
                    <table className="pet-requests-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Owner Name</th>
                                <th>Phone No</th>
                                <th>Pickup Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {caretakingList.map((request) => (
                                <React.Fragment key={request._id}>
                                    <tr onClick={() => toggleExpandRow(request._id)}>
                                        <td>{request._id}</td>
                                        <td>{request.owner_name}</td>
                                        <td>{request.phone_no}</td>
                                        <td>{request.pickup}</td>
                                        <td className={`status ${request.status.toLowerCase()}`}>
                                            {request.status}
                                            {request.status === "Applied" && (
                                                <button onClick={() => handleCancel(request._id)} className="cancel-button">
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                    {expandedRowId === request._id && (
                                        <tr className="expanded-row">
                                            <td colSpan="5">
                                                <div className="expanded-details">
                                                    <div className="left-details">
                                                        <p><strong>Address:</strong> {request.address}</p>
                                                        <p><strong>Alternate Phone No:</strong> {request.alt_phone_no}</p>
                                                        <p><strong>Hostel:</strong> {request.hostel}</p>
                                                        <p><strong>Delivery Date:</strong> {request.deliver}</p>
                                                        <p><strong>Status:</strong> {request.status}</p>
                                                    </div>
                                                    <div className="right-image">
                                                        <img src={`${imagePath}/${request.proof}`} alt="Proof" />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CaretakingStatus;
