import React, { useEffect, useState } from 'react';
import { httpRequest } from '../API/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useParams } from 'react-router-dom';

const Address = () => {
    const { id } = useParams(); // Get address ID from URL

    const [addresses, setAddresses] = useState([]);
    const [filteredAddresses, setFilteredAddresses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
    const toast = React.useRef(null);

    useEffect(() => {
        httpRequest('get', "api/user/getAllAddress")
            .then((response) => {
                if (response.data && response.data.addressList) {
                    setAddresses(response.data.addressList);
                    setFilteredAddresses(response.data.addressList); // Initialize filtered addresses
                    if (id) {
                        const filtered = response.data.addressList.filter(address => address._id === id);
                        setFilteredAddresses(filtered);
                    }
                } else {
                    toast.current.show({ severity: 'info', summary: 'Info', detail: 'No addresses found.', life: 3000 });
                }
            })
            .catch((err) => {
                console.error(err);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch addresses.', life: 3000 });
            });
    }, [id]);

    
    // Function to filter addresses based on search input
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = addresses.filter(address => 
            address.name.toLowerCase().includes(value) || 
            (address.mobileNo && address.mobileNo.toString().includes(value)) ||
            address.address.toLowerCase().includes(value) ||
            (address._id && address._id.includes(value)) || // Include ID in search
            (address.userId && address.userId.includes(value)) // Include User ID in search
        );
        setFilteredAddresses(filtered);
    };

    // Function to render the SL No.
    const slNoTemplate = (rowData, { rowIndex }) => {
        return rowIndex + 1; // SL No. starts from 1
    };

    return (
        <div className="content-div">

        <div style={{ padding: '20px' }}>
            <Toast ref={toast} />
            <h2>User Addresses</h2>
            <div className="flex align-items-center mb-3">
                <InputText
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: '250px', marginRight: '10px' }}
                />
                <span className="mr-2">Show</span>
                <Dropdown
                    value={rowsPerPage}
                    options={[5, 10, 15]}
                    onChange={(e) => setRowsPerPage(e.value)}
                    placeholder="Select Rows"
                    style={{ width: '75px' }}
                />
                <span className="ml-2">records</span>
            </div>
            {filteredAddresses.length === 0 ? (
                <p>No addresses found.</p>
            ) : (
                <DataTable 
                    value={filteredAddresses} 
                    paginator 
                    rows={rowsPerPage} 
                    header="Address List" 
                    emptyMessage="No addresses found."
                >
                    <Column body={slNoTemplate} header="SL No" style={{ width: '50px' }} />
                    <Column field="_id" header="ID" />
                    <Column field="userId" header="User ID" />
                    <Column field="name" header="Name" />
                    <Column field="mobileNo" header="Mobile No" body={rowData => rowData.mobileNo || 'N/A'} />
                    <Column field="address" header="Address" />
                    {/* <Column field="order_id" header="Order ID" body={rowData => rowData.order_id || 'N/A'} /> */}
                </DataTable>
            )}
        </div>
        </div>
    );
}

export default Address;
