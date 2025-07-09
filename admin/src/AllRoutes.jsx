import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LayoutWrapper } from './components/layout/LayoutWrapper';
import { Loader } from './components/ui/Loader';
import auth from '../auth';

// Direct imports for all components
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import AddProduct from './pages/AddProduct';
import Order from './pages/Order';
import Blogs from './pages/Blogs';
import UpdateCategory from './pages/UpdateCategory';
import Addblog from './pages/Addblog';
import Gallery from './pages/Gallery';
import Notfound from './pages/Notfound';
import Caretaker from './pages/Caretaker';
import UpdateProduct from './pages/UpdateProduct';
import UpdateBlog from './pages/UpdateBlog';
import Address from './pages/Address';
import { Categorydetails as CategoryDetailsComponent, AddCategory as AddCategoryComponent } from './pages/Categorydetails';

// Define public routes (no authentication required)
const publicRoutes = [
  { path: '/login', component: Login },
];

// Define private routes (authentication required)
const privateRoutes = [
  { path: '/', component: Home },
  { path: '/productdetails', component: Product },
  { path: '/addproduct', component: AddProduct },
  { path: '/orderdetails', component: Order },
  { path: '/addresses/:id', component: Address },
  { path: '/blogs', component: Blogs },
  { path: '/categoryupdate/:categoryId', component: UpdateCategory },
  { path: '/update/:productId', component: UpdateProduct },
  { path: '/updateblog/:blogId', component: UpdateBlog },
  { path: '/addblog', component: Addblog },
  { path: '/category', component: CategoryDetailsComponent },
  { path: '/addcategory', component: AddCategoryComponent },
  { path: '/gallery', component: Gallery },
  { path: '/caretaking', component: Caretaker },
  { path: '*', component: Notfound },
];

// Authentication wrapper component
const RequireAuth = ({ children }) => {
  const isAuthenticated = auth.onCheckOut();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Just return the children - LayoutWrapper is now handled at the route level
  return children;
};

// Public route wrapper
const PublicRoute = ({ children }) => {
  const isAuthenticated = auth.onCheckOut();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return children;
};

// Main routes component
export const AllRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = auth.onCheckOut();

  // Redirect to login if not authenticated and trying to access protected route
  useEffect(() => {
    if (!isAuthenticated && !publicRoutes.some(route => location.pathname === route.path)) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  // Loading fallback component
  const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen">
      <Loader size="lg" />
    </div>
  );

  // Create route elements with proper layout
  const renderRouteElement = (Component, isPublic = false) => {
    const element = <Component />;
    
    if (isPublic) {
      return <PublicRoute>{element}</PublicRoute>;
    }
    
    return (
      <RequireAuth>
        <LayoutWrapper>
          {element}
        </LayoutWrapper>
      </RequireAuth>
    );
  };

  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map((route, index) => (
        <Route
          key={`public-${index}`}
          path={route.path}
          element={renderRouteElement(route.component, true)}
        />
      ))}

      {/* Protected routes */}
      {privateRoutes.map((route, index) => (
        <Route
          key={`private-${index}`}
          path={route.path}
          element={renderRouteElement(route.component, false)}
        />
      ))}
    </Routes>
  );
};

export default AllRoutes;
