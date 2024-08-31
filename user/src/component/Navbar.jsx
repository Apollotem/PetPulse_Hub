// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import ButtonComponent from './ButtonComponent';
// import './CSS/Navbar.css';
// import { useCart } from "react-use-cart";
// import { fetchAndStore } from '../Slice/userSlice'
// import { useDispatch, useSelector } from 'react-redux';
// import { setUserId } from "../Slice/commonSlice";

// const Navbar = ({ onCartClick }) => {
//     const { totalItems } = useCart();
//     const dispatch = useDispatch()
//     const [isOpen, setIsOpen] = useState(false);
//     // const userId = JSON.parse(localStorage.getItem('userId'));
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (isOpen && !event.target.closest('.navbar-container')) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener('click', handleClickOutside);
//         return () => {
//             document.removeEventListener('click', handleClickOutside);
//         };
//     }, [isOpen]);
//     const [userId, setId] = useState(localStorage.getItem("userId"));

//     const myuserId = useSelector(state => state.common.userId);
// console.log(myuserId);

//     useEffect(() => {
//         const storedUserId = localStorage.getItem("userId");
        
//         // If the stored userId exists and is different from the Redux userId, update the Redux state
     
//         // If myuserId is updated in Redux, update the local state and localStorage
//         // if (myuserId) {
//         //     setId(myuserId);
//         //     // localStorage.setItem("userId", myuserId);
//         //     console.log("hai");
//         // }
//         console.log("hai");
        
//         if ( !userId) {
//             console.log("myuserId",myuserId);
            
//             setId(myuserId);
//     }
//     }, [myuserId, dispatch,userId]);
//     const toggleNavbar = () => {
//         setIsOpen(!isOpen);
//     };

//     const menus = [
//         {
//             menu: 'PETS',
//             to: '/Pets',
//         },
//         {
//             menu: 'FOOD',
//             to: '/foods',
//         },
//         {
//             menu: 'ACCESSORIES',
//             to: '/accessorys',
//         },
//         {
//             menu: 'MEDICINE',
//             to: '/medicine',
//         },
//         {
//             menu: 'BLOGS',
//             to: '/blogs',
//         },
//         {
//             menu: 'CARE TAKING',
//             to: '/caretaking',
//         },
//     ];
//     const logOut = () => {
//         localStorage.removeItem('userId');
//         setUserId(null); // Update state immediately on logout
//     };
//     return (
//         <nav className={`navbar ${isOpen ? 'open' : ''}`}>
//             <div className="navbar-container crossBtn">
//                 <input type="checkbox" name="" id="" checked={isOpen} onChange={toggleNavbar} />
//                 <div className="hamburger-lines" onClick={toggleNavbar}>
//                     <span className="line line1"></span>
//                     <span className="line line2"></span>
//                     <span className="line line3"></span>
//                 </div>
//                 <ul className="menu-items">
//                     {menus.map((menu, id) => (
//                         <li className="menuContainer" key={id}>
//                             <Link to={menu.to} className="menu">
//                                 <span>{menu.menu}</span>
//                             </Link>
//                         </li>
//                     ))}
//                     {userId  ? (
//                         <>
//                             {/* <li>
//                                 <Link to="/cart" className="menu">
//                                     <i className="bi bi-bag-fill"></i>
//                                     <small className='cartNumber'>{totalItems}</small>
//                                 </Link>
//                             </li> */}
//                             <li>
//                                 <div className="menu" onClick={onCartClick}>
//                                     <i className="bi bi-bag-fill"></i>
//                                     <small className='cartNumber'>{totalItems}</small>
//                                 </div>
//                             </li>
//                             <li>
//                                 {/* <Link to="/profile" className="menu">
//                                     <i className="bi bi-person-fill"></i>
//                                 </Link> */}
//                                 <div className="dropdown">
//                                     <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{background:"#fff"}}>
//                                     <i className="bi bi-person-fill"></i>
//                                     </button>
//                                     <ul className="dropdown-menu">
//                                       <li><Link to="/orders" className="menu">My orders</Link></li>
//                                       <li><Link to="/caretakingstatus" className="menu">View Requests</Link></li>
//                                       <li style={{cursor:"pointer"}} onClick={logOut} ><i className="bi bi-power" style={{color:"red",cursor:"pointer"}} ></i>Logout</li>
//                                     </ul>
//                                 </div>
//                             </li>
//                         </>
//                     ) : (
//                         <li>
//                             <Link to="/login">
//                                 <button className="addbtn smallBtn">Login </button>
//                             </Link>
//                         </li>
//                     )}
//                 </ul>
//                 <h1 className="logo">
//                     <Link to="/">
//                         {/* <img src="./images/logo.png" alt="" /> */}
//                         <img src="./images/logoLatest.png" alt="" />
//                     </Link>
//                 </h1>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';
import './CSS/Navbar.css';
import { useCart } from "react-use-cart";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthId } from "../Slice/commonSlice";

const Navbar = ({ onCartClick }) => {
    const { totalItems } = useCart();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    // const userId = useSelector(state => state.common.authId);
    const authId = useSelector(state => state.common.authId);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));

useEffect(()=>{
console.log("rerendering....");
// if(authId )
if(authId && !userId)
{
    console.log(authId);
    setUserId(authId)
    // setAuthId(authId)
}
// if(authId==null && userId ){
// dispatch(setAuthId(userId))
// }
},[userId,authId])
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    console.log(userId);
    const logOut = () => {
        localStorage.removeItem('userId');
        dispatch(setAuthId(null));
        console.log(userId);
        
        setUserId(null)
        // setAuthId(null); // Update local state
    };

    const menus = [
        { menu: 'PETS', to: '/Pets' },
        { menu: 'FOOD', to: '/foods' },
        { menu: 'ACCESSORIES', to: '/accessorys' },
        { menu: 'MEDICINE', to: '/medicine' },
        { menu: 'BLOGS', to: '/blogs' },
        { menu: 'CARE TAKING', to: '/caretaking' },
    ];

    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <div className="navbar-container crossBtn">
                <input type="checkbox" checked={isOpen} onChange={toggleNavbar} />
                <div className="hamburger-lines" onClick={toggleNavbar}>
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>
                <ul className="menu-items">
                    {menus.map((menu, id) => (
                        <li className="menuContainer" key={id}>
                            <Link to={menu.to} className="menu">
                                <span>{menu.menu}</span>
                            </Link>
                        </li>
                    ))}
                    {userId ? (
                        <>
                            <li>
                                <div className="menu" onClick={onCartClick}>
                                    <i className="bi bi-bag-fill"></i>
                                    <small className='cartNumber'>{totalItems}</small>
                                </div>
                            </li>
                            <li>
                                <div className="dropdown">
                                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ background: "#fff" }}>
                                        <i className="bi bi-person-fill"></i>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/orders" className="menu">My orders</Link></li>
                                        <li><Link to="/caretakingstatus" className="menu">View Requests</Link></li>
                                        <li style={{ cursor: "pointer" }} onClick={logOut}><i className="bi bi-power" style={{ color: "red" }}></i>Logout</li>
                                    </ul>
                                </div>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login">
                                <button className="addbtn smallBtn">Login</button>
                            </Link>
                        </li>
                    )}
                </ul>
                <h1 className="logo">
                    <Link to="/">
                        <img src="./images/logoLatest.png" alt="" />
                    </Link>
                </h1>
            </div>
        </nav>
    );
};

export default Navbar;
