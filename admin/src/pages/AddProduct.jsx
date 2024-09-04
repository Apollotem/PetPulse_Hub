// import { useEffect, useRef, useState } from "react";
// import { httpRequest } from "../API/api"
// const AddProduct = () => {
//     const prodcutName = useRef('');
//     const oldPrice = useRef('');
//     const newPrice = useRef('');
//     const Description = useRef('');
//     const [image, setImage] = useState('');
//     const [categoryId, setCategoryId] = useState('');
//     const [categoryList, setCategoryList] = useState([]);
//     const [message, setMessage] = useState("");
//     const showMessage = (msg) => {
//         setMessage(msg);
//         setTimeout(() => setMessage(""), 3000)
//     }
//     useEffect(() => {
//         httpRequest('get', "api/category").then((data) => {
//             if (data && Array.isArray(data.categoryDetails)) {
//                 setCategoryList(data.categoryDetails);
//             } else {
//                 console.error("Fetched data does not contain 'categoryDetails' array:", data);
//             }
//         }).catch(error => {
//             console.error("Error fetching data:", error);
//         });
//     }, []);
//     const resetValues = () => {
//         prodcutName.current.value = "";
//         Description.current.value = "";
//         oldPrice.current.value = "";
//         newPrice.current.value = "";
//         setImage('');
//     }
//     const saveProduct = () => {
//         const productDetails = new FormData();
//         productDetails.append('name', prodcutName.current.value);
//         productDetails.append('image', image);
//         productDetails.append('description', Description.current.value);
//         productDetails.append('oldPrice', oldPrice.current.value);
//         productDetails.append('newPrice', newPrice.current.value);
//         productDetails.append('status', 0);
//         productDetails.append('category_id', categoryId);
//         console.log(productDetails);
//         httpRequest('post', 'api/product/save', productDetails)
//             .then((response) => {
//                 showMessage(response.message);
//                 resetValues();
//             })
//             .catch((err) => console.log(err));
//     }
//     return (
//         <div className="content-div">
//             <div className="card-header">
//                 <div className="card-headding">Add Product </div>
//                 <div className="errorMessage">{message}</div>
//             </div>
//             <div className="table-container">
//                 <div className="row " style={{ padding: "37px" }}>
//                     <div className="col">
//                         <label htmlFor="category">Product Name</label>
//                         <input type="text" id="category" className="form-control" ref={prodcutName} />
//                     </div>
//                     <div className="col">
//                         <label htmlFor="maincat">Category</label>
//                         <select className="form-select" id="maincat" aria-label="Default select example" onClick={(e) => setCategoryId(e.target.value)}>
//                             <option value="choose_anything" selected>--Select--</option>
//                             {
//                                 categoryList.map((category, index) => {
//                                     return <option value={category._id} key={index}>{category.mainCategory},{category.category},{category.subCategory}</option>
//                                 })
//                             }
//                         </select>
//                     </div>
//                 </div>
//                 <div className="row" style={{ padding: "16px 37px" }}>
//                     <div className="col-4">
//                         <label htmlFor="sub_cat">Old Price</label>
//                         <input type="text" className="form-control" id="sub_cat" ref={oldPrice} />
//                     </div>
//                     <div className="col-4">
//                         <label htmlFor="sub_cat">Price</label>
//                         <input type="text" className="form-control" id="sub_cat" ref={newPrice} />
//                     </div>
//                     <div className="col-4">
//                         <label htmlFor="sub_cat">Image</label>
//                         <input type="file" className="form-control" id="sub_cat" onChange={(e) => setImage(e.target.files[0])} />
//                     </div>
//                 </div>
//                 <div className="row" style={{ padding: "16px 37px" }}>
//                     <div className=" mb-3">
//                         <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
//                         <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref={Description}></textarea>
//                     </div>
//                 </div>


//                 <div className="row" style={{ padding: "16px 37px" }}>
//                     <button className="btn btn-primary" onClick={saveProduct}>Save</button>
//                 </div>
//             </div>

//         </div>
//     );
// }
// export default AddProduct;
import { useEffect, useRef, useState } from "react";
import { httpRequest } from "../API/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddProduct = () => {
    const productName = useRef('');
    const oldPrice = useRef('');
    const newPrice = useRef('');
    const description = useRef('');
    const [image, setImage] = useState(null);
    const [categoryId, setCategoryId] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
    };

    useEffect(() => {
        httpRequest('get', "api/category").then((data) => {
            if (data && Array.isArray(data.categoryDetails)) {
                setCategoryList(data.categoryDetails);
            } else {
                console.error("Fetched data does not contain 'categoryDetails' array:", data);
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);

    const resetValues = () => {
        productName.current.value = "";
        description.current.value = "";
        oldPrice.current.value = "";
        newPrice.current.value = "";
        setImage(null);
        setCategoryId("");
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};

        if (!productName.current.value.trim()) {
            newErrors.productName = "Product name is required";
        }
        if (!categoryId) {
            newErrors.categoryId = "Category is required";
        }
        if (!oldPrice.current.value.trim()) {
            newErrors.oldPrice = "Old price is required";
        }
        if (!newPrice.current.value.trim()) {
            newErrors.newPrice = "New price is required";
        }
        if (!description.current.value.trim()) {
            newErrors.description = "Description is required";
        }
        if (!image) {
            newErrors.image = "Image is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const saveProduct = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const productDetails = new FormData();
        productDetails.append('name', productName.current.value);
        productDetails.append('image', image);
        productDetails.append('description', description.current.value);
        productDetails.append('oldPrice', oldPrice.current.value);
        productDetails.append('newPrice', newPrice.current.value);
        productDetails.append('status', 0);
        productDetails.append('category_id', categoryId);

        httpRequest('post', 'api/product/save', productDetails)
            .then((res) => {
                // showMessage(response.message);
                if (res.status == "success") {
                    toast.success(res.message, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    // setProductList(prevDetails => prevDetails.filter(product => product._id !== product_id));
                    resetValues()
                } else {
                    toast.error(res.message, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
                resetValues();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="content-div">
            <ToastContainer/>
            <div className="card-header">
                <div className="card-headding main-menu-headding">Add Product </div>
                <div className="errorMessage">{message}</div>
            </div>
            <div className="table-container">
                <form onSubmit={saveProduct}>
                    <div className="row" style={{ padding: "37px" }}>
                        <div className="col">
                            <label htmlFor="productName">Product Name</label>
                            <input type="text" id="productName" className="form-control" ref={productName} />
                            {errors.productName && <small style={{ color: "red" }}>{errors.productName}</small>}
                        </div>
                        <div className="col">
                            <label htmlFor="category">Category</label>
                            <select className="form-select" id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                <option value="">--Select--</option>
                                {
                                    categoryList.map((category, index) => (
                                        <option value={category._id} key={index}>{category.mainCategory}, {category.category}, {category.subCategory}</option>
                                    ))
                                }
                            </select>
                            {errors.categoryId && <small style={{ color: "red" }}>{errors.categoryId}</small>}
                        </div>
                    </div>
                    <div className="row" style={{ padding: "16px 37px" }}>
                        <div className="col-4">
                            <label htmlFor="oldPrice">Old Price</label>
                            <input type="text" className="form-control" id="oldPrice" ref={oldPrice} />
                            {errors.oldPrice && <small style={{ color: "red" }}>{errors.oldPrice}</small>}
                        </div>
                        <div className="col-4">
                            <label htmlFor="newPrice">New Price</label>
                            <input type="text" className="form-control" id="newPrice" ref={newPrice} />
                            {errors.newPrice && <small style={{ color: "red" }}>{errors.newPrice}</small>}
                        </div>
                        <div className="col-4">
                            <label htmlFor="image">Image</label>
                            <input type="file" className="form-control" id="image" onChange={(e) => setImage(e.target.files[0])} />
                            {errors.image && <small style={{ color: "red" }}>{errors.image}</small>}
                        </div>
                    </div>
                    <div className="row" style={{ padding: "16px 37px" }}>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" rows="3" ref={description}></textarea>
                            {errors.description && <small style={{ color: "red" }}>{errors.description}</small>}
                        </div>
                    </div>
                    <div className="row" style={{ padding: "16px 37px" }}>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
