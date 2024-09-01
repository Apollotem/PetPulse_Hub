// import { useState, useEffect } from "react";
// import { httpRequest } from "../API/api"
// const Caretaker = () => {
//     const [caretakingList, setCaretakingList] = useState([])
//     useEffect(() => {
//         httpRequest('get', "api/user/getallCaretaking").then((res) => {
//             setCaretakingList(res.data);
//         }).catch(error => {
//             console.error("Error fetching data:", error);
//         });
//     }, []);
//     const tableHeadding = [{ th: "#id" }, { th: "owner_name" }, { th: "phone_no" }, { th: "id_proof" }, { th: "pickup" }, { th: "deliver" }, { th: "hostel" }, { th: "address" }, { th: "Action" },];
//     const changeToReject = (id) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this item?');

//         if (confirmDelete) {
//             httpRequest('post', "api/user/updateCaretakeStatus", { id: id ,status:"Rejected"})
//                 .then((res) => {
//                     if (res.status === "success") {
//                         let a = caretakingList.map(data => data._id === id ? { ...data, status: "Rejected" } : data)
//                         setCaretakingList(a)

//                     }
//                 })
//         }
//     }
//     return (
//         <div className="flat-container content-div">
//             <div className="card-header">
//                 <div className="card-headding main-menu-headding">Caretaking Services</div>
//             </div>
//             <div className="">
//                 <table className="table-container table">
//                     <thead>
//                         <tr className="table-headding">
//                             {
//                                 tableHeadding.map((eachHeadding, id) =>
//                                     <td key={id}>{eachHeadding.th}</td>
//                                 )
//                             }
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {caretakingList.map((caretaker, index) => {
//                             return (
//                                 <tr key={index}>
//                                     <td>{index + 1}</td>
//                                     <td>{caretaker.owner_name}</td>
//                                     <td>{caretaker.phone_no},{caretaker.alt_phone_no}</td>
//                                     <td><img src={`http://localhost:5001/${caretaker.proof}`} alt="img" style={{ "width": "100px" }} /></td>
//                                     <td>{caretaker.pickup}</td>
//                                     <td>{caretaker.deliver}</td>
//                                     <td>{caretaker.hostel}</td>
//                                     <td>{caretaker.address}</td>
//                                     <td><button className="btn-primary" onClick={() => changeToReject(caretaker._id)}>{caretaker.status}</button></td>
//                                 </tr>
//                             )
//                         })}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export default Caretaker
import React, { useState, useEffect } from "react";
import { httpRequest } from "../API/api";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons

const Caretaker = () => {
    const [caretakingList, setCaretakingList] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' }
    });
    const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page

    useEffect(() => {
        httpRequest('get', "api/user/getallCaretaking").then((res) => {
            setCaretakingList(res.data);
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);

    const changeToReject = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');

        if (confirmDelete) {
            httpRequest('post', "api/user/updateCaretakeStatus", { id: id, status: "Rejected" })
                .then((res) => {
                    if (res.status === "success") {
                        let updatedList = caretakingList.map(data => data._id === id ? { ...data, status: "Rejected" } : data);
                        setCaretakingList(updatedList);
                    }
                });
        }
    };

    const header = (
        <div className="flex justify-content-between align-items-center">
            <div className="flex align-items-center">
                <span className="mr-2">Show</span>
                <Dropdown
                    value={rowsPerPage}
                    options={[5, 10, 15]}
                    onChange={(e) => setRowsPerPage(e.value)}
                    placeholder="Select Rows"
                    className="p-dropdown"
                    style={{ width: '75px' }}
                />
                <span className="ml-2">records</span>
            </div>
            <InputText
                placeholder="Search..."
                onInput={(e) => setFilters({ ...filters, global: { value: e.target.value, matchMode: 'contains' } })}
                style={{ width: '250px' }}
            />
        </div>
    );

    return (
        <div className="flat-container content-div">
            <div className="card-header">
                <div className="card-headding main-menu-headding">Caretaking Services</div>
            </div>
            <DataTable
                value={caretakingList}
                paginator
                rows={rowsPerPage}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                header={header}
                emptyMessage="No caretaking records found."
                globalFilterFields={['owner_name', 'phone_no', 'pickup', 'deliver', 'hostel', 'address', 'status']}
                rowsPerPageOptions={[5, 10, 15]} // Options for rows per page
            >
                <Column field="_id" header="#id" body={(rowData, { rowIndex }) => rowIndex + 1} />
                <Column field="owner_name" header="Owner Name" />
                <Column field="phone_no" header="Phone No" body={(rowData) => `${rowData.phone_no}, ${rowData.alt_phone_no}`} />
                <Column
                    field="proof"
                    header="ID Proof"
                    body={(rowData) => <img src={`http://localhost:5001/${rowData.proof}`} alt="ID Proof" style={{ width: "100px" }} />}
                />
                <Column field="pickup" header="Pickup" />
                <Column field="deliver" header="Deliver" />
                <Column field="hostel" header="Hostel" />
                <Column field="address" header="Address" />
                <Column
                    header="Action"
                    body={(rowData) => (
                        <button className="btn-primary" onClick={() => changeToReject(rowData._id)}>
                            {rowData.status}
                        </button>
                    )}
                />
            </DataTable>
        </div>
    );
};

export default Caretaker;
