import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { changeVisibility } from "../Slice/visibilitySlice"
import { useEffect } from "react";
const Navbar = () => {
    const menuData = [
        {
            menu: 'Dashboard',
            url: "/",
            subMenu: {
                menu: 'menu 1',
                url: "/"
            },
        },
        {
            menu: 'Service',
            subMenu: [
                {
                    menu: 'Category',
                    url: "/category"
                },
                {
                    menu: 'Product',
                    url: "/productdetails"
                },
                {
                    menu: 'Caretaker',
                    url: "/caretaking"
                },
                {
                    menu: 'Order',
                    url: "/orderdetails"
                },
                {
                    menu: 'Blog',
                    url: "/blogs"
                },
                {
                    menu: 'Gallery',
                    url: "/gallery"
                },
            ],
        },
    ];
    // const[navbarShowOrHide,isToogleVisibility]=useState(false);
    // const navbarCallBack=(e)=>{
    //     isToogleVisibility(!navbarShowOrHide);
    //     console.log(navbarShowOrHide);
    // }
    const visibility = useSelector((state) => state.visibility.visibility)

    return (
        <>
            <Topnavbar
            // navbarShowOrHide={navbarShowOrHide} 
            // navbarCallBack={navbarCallBack}
            />
            <div className={visibility ? "content-container shows" : "hide"}>
                <div className="side-nav-container" >
                    {menuData.map((menuItem, index) => (
                        <div className="menu-container" key={index}>
                            <div className="main-menu-headding">{menuItem.menu}</div>

                            {Array.isArray(menuItem.subMenu) ? (
                                <>
                                    {menuItem.subMenu.map((subMenuItem, subIndex) => (
                                        <Link to={subMenuItem.url} key={subIndex}>
                                            <div className="submenu" key={subIndex}>{subMenuItem.menu}</div>

                                        </Link>))}
                                </>
                            ) : (
                                <Link to={menuItem.subMenu.url}>
                                    <div className="submenu" >{menuItem.subMenu.menu}</div>
                                </Link>

                            )}
                        </div>

                    ))}
                </div>
            </div>
        </>
    );
}
export default Navbar;
export const Topnavbar = () => {
    const dispatch = useDispatch();
    const visibility = useSelector((state) => state.visibility.visibility)
    // dispatch(changeVisibility(!visibility))
const navigate=useNavigate()
    const logout=()=>{
        localStorage.removeItem('adminId');
        navigate('/login'); 
    }
    return (
        <div className="topnav-container">

            <div className="top-leftContainer">
                <div className="logo">
                    <img src="./images/logoLatest.png" alt="logo" style={{ width: "81px" }} />
                </div>
                <div className="closingBtn" onClick={() => dispatch(changeVisibility(!visibility))}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            {/* <div className="admin-name">
                Admin
                <div className="option"><i className="bi bi-box-arrow-left" style={{paddingRight: "6px",color:"red"}}></i>Logout</div>
            </div> */}
            <div className="dropdown" style={{all:"unset"}}>
                <button className="btn btn-secondary dropdown-toggle"  style={{all:"unset"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
Admin                </button>
                <ul className="dropdown-menu">
                    <li onClick={logout} style={{cursor:'pointer'}}><i className="bi bi-box-arrow-left" style={{paddingLeft: "10px",paddingRight: "6px",color:"red",cursor:'pointer'}}></i>Logout</li>
                </ul>
            </div>
        </div>
    );
}