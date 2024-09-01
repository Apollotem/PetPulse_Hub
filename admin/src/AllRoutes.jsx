// // // import Home from "./pages/Home"
// // // import Product from "./pages/Product.jsx"
// // // import AddProduct from "./pages/AddProduct.jsx"
// // // import Order from "./pages/Order.jsx"
// // // import Blogs from "./pages/Blogs"
// // // import { UpdateCategory } from "./pages/UpdateCategory.jsx"
// // // import Addblog from "./pages/Addblog"
// // // import Gallery from "./pages/Gallery"
// // // import Notfound from "./pages/Notfound.jsx"
// // // import Caretaker from "./pages/Caretaker.jsx"
// // // import UpdateProduct from "./pages/UpdateProduct.jsx"
// // // import UpdateBlog from "./pages/UpdateBlog.jsx"
// // // import { Login } from "./pages/Login.jsx"
// // // import { Categorydetails, AddCategory } from "./pages/Categorydetails"
// // // import { Route, Routes,useLocation,useNavigate } from 'react-router-dom';
// // // import auth from "../auth.js"
// // // import { useEffect } from "react"
// // // import Navbar from "./components/Navbar.jsx"


// // // const routerInfo = [
// // //     { path: "/", component: <Home /> },
// // //     { path: "/login", component: <Login /> },
// // //     { path: "/productdetails", component: <Product /> },
// // //     { path: "/addproduct", component: <AddProduct /> },
// // //     { path: "/orderdetails", component: <Order /> },
// // //     { path: "/blogs", component: <Blogs /> },
// // //     { path: "/categoryupdate/:categoryId", component: <UpdateCategory /> },
// // //     { path: "/update/:productId", component: <UpdateProduct /> },
// // //     { path: "/updateblog/:blogId", component: <UpdateBlog /> },
// // //     { path: "/addblog", component: <Addblog /> },
// // //     { path: "/category", component: <Categorydetails /> },
// // //     { path: "/addcategory", component: <AddCategory /> },
// // //     { path: "/gallery", component: <Gallery /> },
// // //     { path: "/caretaking", component: <Caretaker /> },
// // //     { path: "*", component: <Notfound /> },
// // // ];

// // // const PrivateRoute = ({ children }) => {
// // //     const navigate = useNavigate();
// // //     const adminId = auth.onCheckOut();
    
// // //     useEffect(() => {
// // //         if (!adminId) {
// // //             navigate("/login");
// // //         }
// // //     }, [adminId, navigate]);
    
// // //     if (!adminId) {
// // //         return null;
// // //     }

// // //     return children;
// // // };

// // // export const AllRoutes = () => {
// // //     const noCommonComponents = ['/login'];
// // //     const location = useLocation();
// // //     const navigate = useNavigate();
  
// // //     useEffect(() => {
// // //         if (!auth.onCheckOut()) {
// // //             navigate("/login");
// // //         }
// // //     }, [location, navigate]);

// // //     return (
// // //         <div className="nav-container">
// // //             {!noCommonComponents.includes(location.pathname) && <Navbar />}
// // //             <Routes>
// // //                 {routerInfo.map((eachRoute, id) => {
// // //                     if (noCommonComponents.includes(eachRoute.path)) {
// // //                         return (
// // //                             <Route key={id} path={eachRoute.path} element={eachRoute.component} />
// // //                         );
// // //                     }
          
// // //                     return (
// // //                         <Route
// // //                             key={id}
// // //                             path={eachRoute.path}
// // //                             element={
// // //                                 <PrivateRoute>
// // //                                     {eachRoute.component}
// // //                                 </PrivateRoute>
// // //                             }
// // //                         />
// // //                     );
// // //                 })}
// // //             </Routes>
// // //         </div>
// // //     );
// // // };
// // import Home from "./pages/Home";
// // import Product from "./pages/Product.jsx";
// // import AddProduct from "./pages/AddProduct.jsx";
// // import Order from "./pages/Order.jsx";
// // import Blogs from "./pages/Blogs";
// // import { UpdateCategory } from "./pages/UpdateCategory.jsx";
// // import Addblog from "./pages/Addblog";
// // import Gallery from "./pages/Gallery";
// // import Notfound from "./pages/Notfound.jsx";
// // import Caretaker from "./pages/Caretaker.jsx";
// // import UpdateProduct from "./pages/UpdateProduct.jsx";
// // import UpdateBlog from "./pages/UpdateBlog.jsx";
// // import { Login } from "./pages/Login.jsx";
// // import { Categorydetails, AddCategory } from "./pages/Categorydetails";
// // import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// // import auth from "../auth.js";
// // import { useEffect } from "react";
// // import Navbar from "./components/Navbar.jsx";

// // const routerInfo = [
// //     { path: "/", component: <Home /> },
// //     { path: "/login", component: <Login /> },
// //     { path: "/productdetails", component: <Product /> },
// //     { path: "/addproduct", component: <AddProduct /> },
// //     { path: "/orderdetails", component: <Order /> },
// //     { path: "/blogs", component: <Blogs /> },
// //     { path: "/categoryupdate/:categoryId", component: <UpdateCategory /> },
// //     { path: "/update/:productId", component: <UpdateProduct /> },
// //     { path: "/updateblog/:blogId", component: <UpdateBlog /> },
// //     { path: "/addblog", component: <Addblog /> },
// //     { path: "/category", component: <Categorydetails /> },
// //     { path: "/addcategory", component: <AddCategory /> },
// //     { path: "/gallery", component: <Gallery /> },
// //     { path: "/caretaking", component: <Caretaker /> },
// //     { path: "*", component: <Notfound /> },
// // ];

// // const PrivateRoute = ({ children }) => {
// //     const navigate = useNavigate();
// //     const adminId = auth.onCheckOut();
    
// //     useEffect(() => {
// //         if (!adminId) {
// //             navigate("/login");
// //         }
// //     }, [adminId, navigate]);
    
// //     if (!adminId) {
// //         return null;
// //     }

// //     return children;
// // };

// // export const AllRoutes = () => {
// //     const noCommonComponents = ['/login'];
// //     const location = useLocation();
// //     const adminId = auth.onCheckOut();
// //     const navigate = useNavigate();
  
// //     useEffect(() => {
// //         if (!adminId && location.pathname !== '/login') {
// //             navigate("/login");
// //         }
// //     }, [adminId, location.pathname, navigate]);

// //     return (
// //         <div className="nav-container">
// //             {!noCommonComponents.includes(location.pathname) && <Navbar />}
// //             <Routes>
// //                 {routerInfo.map((eachRoute, id) => {
// //                     if (noCommonComponents.includes(eachRoute.path)) {
// //                         return (
// //                             <Route key={id} path={eachRoute.path} element={eachRoute.component} />
// //                         );
// //                     }
          
// //                     return (
// //                         <Route
// //                             key={id}
// //                             path={eachRoute.path}
// //                             element={
// //                                 <PrivateRoute>
// //                                     {eachRoute.component}
// //                                 </PrivateRoute>
// //                             }
// //                         />
// //                     );
// //                 })}
// //             </Routes>
// //         </div>
// //     );
// // };
// import { useEffect } from "react";
// import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// import auth from "../auth.js";
// import Navbar from "./components/Navbar.jsx";
// import Home from "./pages/Home";
// import Product from "./pages/Product.jsx";
// import AddProduct from "./pages/AddProduct.jsx";
// import Order from "./pages/Order.jsx";
// import Blogs from "./pages/Blogs";
// import { UpdateCategory } from "./pages/UpdateCategory.jsx";
// import Addblog from "./pages/Addblog";
// import Gallery from "./pages/Gallery";
// import Notfound from "./pages/Notfound.jsx";
// import Caretaker from "./pages/Caretaker.jsx";
// import UpdateProduct from "./pages/UpdateProduct.jsx";
// import UpdateBlog from "./pages/UpdateBlog.jsx";
// import { Login } from "./pages/Login.jsx";
// import { Categorydetails, AddCategory } from "./pages/Categorydetails";

// const routerInfo = [
//     { path: "/", component: <Home /> },
//     { path: "/login", component: <Login /> },
//     { path: "/productdetails", component: <Product /> },
//     { path: "/addproduct", component: <AddProduct /> },
//     { path: "/orderdetails", component: <Order /> },
//     { path: "/blogs", component: <Blogs /> },
//     { path: "/categoryupdate/:categoryId", component: <UpdateCategory /> },
//     { path: "/update/:productId", component: <UpdateProduct /> },
//     { path: "/updateblog/:blogId", component: <UpdateBlog /> },
//     { path: "/addblog", component: <Addblog /> },
//     { path: "/category", component: <Categorydetails /> },
//     { path: "/addcategory", component: <AddCategory /> },
//     { path: "/gallery", component: <Gallery /> },
//     { path: "/caretaking", component: <Caretaker /> },
//     { path: "*", component: <Notfound /> },
// ];

// const PrivateRoute = ({ children }) => {
//     const navigate = useNavigate();
//     const adminId = auth.onCheckOut();

//     useEffect(() => {
//         if (!adminId) {
//             navigate("/login");
//         }
//     }, [adminId, navigate]);

//     if (!adminId) {
//         return null;
//     }

//     return children;
// };

// export const AllRoutes = () => {
//     const noCommonComponents = ['/login'];
//     const location = useLocation();
//     const adminId = auth.onCheckOut();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!adminId && location.pathname !== '/login') {
//             navigate("/login");
//         }
//     }, [adminId, location.pathname, navigate]);
// console.log("adminId",adminId);

//     return (
//         <div className="nav-container">
//         {adminId!=null && !noCommonComponents.includes(location.pathname) && <Navbar />}
//         <Routes>
//           {routerInfo.map((eachRoute, id) => {
//             if (noCommonComponents.includes(eachRoute.path)) {
//               return (
//                 <Route key={id} path={eachRoute.path} element={eachRoute.component} />
//               );
//             }
      
//             return (
//               <Route
//                 key={id}
//                 path={eachRoute.path}
//                 element={
//                   <PrivateRoute>
//                     {eachRoute.component}
//                   </PrivateRoute>
//                 }
//               />
//             );
//           })}
//         </Routes>
//       </div>
//     );
// };

import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import auth from "../auth.js";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import Product from "./pages/Product.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Order from "./pages/Order.jsx";
import Blogs from "./pages/Blogs";
import { UpdateCategory } from "./pages/UpdateCategory.jsx";
import Addblog from "./pages/Addblog";
import Gallery from "./pages/Gallery";
import Notfound from "./pages/Notfound.jsx";
import Caretaker from "./pages/Caretaker.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import UpdateBlog from "./pages/UpdateBlog.jsx";
import { Login } from "./pages/Login.jsx";
import Address from "./pages/Address.jsx";
import { Categorydetails, AddCategory } from "./pages/Categorydetails";

// Define your routes
const routerInfo = [
    { path: "/", component: <Home /> },
    { path: "/login", component: <Login /> },
    { path: "/productdetails", component: <Product /> },
    { path: "/addproduct", component: <AddProduct /> },
    { path: "/orderdetails", component: <Order /> },
    { path: "/addresses/:id", component: <Address /> },
    // <Route path="/addresses/:id" element={<Address />} /> 
    { path: "/blogs", component: <Blogs /> },
    { path: "/categoryupdate/:categoryId", component: <UpdateCategory /> },
    { path: "/update/:productId", component: <UpdateProduct /> },
    { path: "/updateblog/:blogId", component: <UpdateBlog /> },
    { path: "/addblog", component: <Addblog /> },
    { path: "/category", component: <Categorydetails /> },
    { path: "/addcategory", component: <AddCategory /> },
    { path: "/gallery", component: <Gallery /> },
    { path: "/caretaking", component: <Caretaker /> },
    { path: "*", component: <Notfound /> },
];

// Define the PrivateRoute component
const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const adminId = auth.onCheckOut();

    useEffect(() => {
        if (!adminId) {
            navigate("/login");
        }
    }, [adminId, navigate]);

    if (!adminId) {
        return null;
    }

    return children;
};

// Define the AllRoutes component
export const AllRoutes = () => {
    const noCommonComponents = ['/login'];
    const location = useLocation();
    const adminId = auth.onCheckOut();
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminId && location.pathname !== '/login') {
            navigate("/login");
        }
    }, [adminId, location.pathname, navigate]);

    console.log("adminId", adminId);

    return (
        <div className="nav-container">
            {/* Conditionally render Navbar only if adminId is not null and not on the login page */}
            {adminId && !noCommonComponents.includes(location.pathname) && <Navbar />}
            <Routes>
                {routerInfo.map((eachRoute, id) => {
                    if (noCommonComponents.includes(eachRoute.path)) {
                        return (
                            <Route key={id} path={eachRoute.path} element={eachRoute.component} />
                        );
                    }

                    return (
                        <Route
                            key={id}
                            path={eachRoute.path}
                            element={
                                <PrivateRoute>
                                    {eachRoute.component}
                                </PrivateRoute>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
};

