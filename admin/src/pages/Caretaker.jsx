import { useState, useEffect } from "react";
import { httpRequest } from "../API/api"
const Caretaker = () => {
    const [caretakingList, setCaretakingList] = useState([])
    useEffect(() => {
        httpRequest('get', "api/user/getallCaretaking").then((res) => {
            setCaretakingList(res.data);
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);
    const tableHeadding = [{ th: "#id" }, { th: "owner_name" }, { th: "phone_no" }, { th: "id_proof" }, { th: "pickup" }, { th: "deliver" }, { th: "hostel" }, { th: "address" }, { th: "Action" },];
    const changeToReject = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');

        if (confirmDelete) {
            httpRequest('post', "api/user/updateCaretakeStatus", { id: id ,status:"Rejected"})
                .then((res) => {
                    if (res.status === "success") {
                        let a = caretakingList.map(data => data._id === id ? { ...data, status: "Rejected" } : data)
                        setCaretakingList(a)

                    }
                })
        }
    }
    return (
        <div className="flat-container content-div">
            <div className="card-header">
                <div className="card-headding main-menu-headding">Caretaking Services</div>
            </div>
            <div className="">
                <table className="table-container table">
                    <thead>
                        <tr className="table-headding">
                            {
                                tableHeadding.map((eachHeadding, id) =>
                                    <td key={id}>{eachHeadding.th}</td>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {caretakingList.map((caretaker, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{caretaker.owner_name}</td>
                                    <td>{caretaker.phone_no},{caretaker.alt_phone_no}</td>
                                    <td><img src={`http://localhost:5001/${caretaker.proof}`} alt="img" style={{ "width": "100px" }} /></td>
                                    <td>{caretaker.pickup}</td>
                                    <td>{caretaker.deliver}</td>
                                    <td>{caretaker.hostel}</td>
                                    <td>{caretaker.address}</td>
                                    <td><button className="btn-primary" onClick={() => changeToReject(caretaker._id)}>{caretaker.status}</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Caretaker
