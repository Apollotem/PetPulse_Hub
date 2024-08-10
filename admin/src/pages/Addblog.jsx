import { useRef, useState } from "react";
import { httpRequest } from "../API/api.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CSS/form.css";

const AddBlog = () => {
    const category = useRef("");
    const videoLink = useRef("");
    const description = useRef("");
    const [msg, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
    
        if (!category.current.value.trim()) {
            newErrors.category = "Video category is required";
        }
        if (!videoLink.current.value.trim()) {
            newErrors.videoLink = "YouTube link is required";
        } else if (!/^https:\/\/www\.youtube\.com\/(watch\?v=|embed\/)/.test(videoLink.current.value)) {
            newErrors.videoLink = "Invalid YouTube link format";
        }
        if (!description.current.value.trim()) {
            newErrors.description = "Description is required";
        }
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length > 0) {
            hideErrors(); // Hide errors after 3 seconds
        }
    
        return Object.keys(newErrors).length === 0;
    };
    
   
    const addBlog = () => {
        if (!validateForm()) {
            return;
        }

        const blogData = {
            "category": category.current.value,
            "link": videoLink.current.value,
            "description": description.current.value
        };

        httpRequest(
            'post',
            "api/blog/add",
            blogData,
        ).then((response) => {
           if(response.status){            
            toast.success(response.message, {
                position: 'top-right',
                autoClose: 3000,
            });
           }
           else{
            toast.error("Blog was not added", {
                position: 'top-right',
                autoClose: 3000,
            });
           }
            console.log(response);
            category.current.value = "";
            videoLink.current.value = "";
            description.current.value = "";
            hideMessage();
        });
    };

    const hideMessage = () => {
        setTimeout(() => setMessage(""), 3000);
    };

    const hideErrors = () => {
        setTimeout(() => setErrors({}), 3000);
    };

    return (
        <div className="content-div">
            <ToastContainer/>
            <div className="card-header">
                <div className="card-heading main-menu-headding">Add Blog</div>
                <div className="errorMessage">{msg}</div>
            </div>
            <div className="table-container">
                <div className="row" style={{ padding: "37px" }}>
                    <div className="col">
                        <label htmlFor="Title" className="form-label">Video Category</label>
                        <input type="text" ref={category} className="form-control" id="Title" />
                        {errors.category && <small style={{ color: "red" }}>{errors.category}</small>}
                    </div>
                    <div className="col">
                        <label htmlFor="formFile" className="form-label">YouTube Link</label>
                        <input className="form-control" ref={videoLink} type="text" id="formFile" />
                        {errors.videoLink && <small style={{ color: "red" }}>{errors.videoLink}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" ref={description} id="exampleFormControlTextarea1" rows="3"></textarea>
                        {errors.description && <small style={{ color: "red" }}>{errors.description}</small>}
                    </div>
                    <button className="btn btn-primary" onClick={addBlog}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;
