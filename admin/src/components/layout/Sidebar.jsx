import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBox, FaListAlt, FaShoppingCart, FaUserCog, FaImages, FaBlog, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const menuItems = [
  { 
    title: 'Dashboard', 
    path: '/',
    icon: <FaHome className="w-5 h-5" />
  },
  { 
    title: 'Products', 
    path: '/productdetails',
    icon: <FaBox className="w-5 h-5" />
  },
  { 
    title: 'Categories', 
    path: '/category',
    icon: <FaListAlt className="w-5 h-5" />
  },
  { 
    title: 'Orders', 
    path: '/orderdetails',
    icon: <FaShoppingCart className="w-5 h-5" />
  },
  { 
    title: 'Blogs', 
    path: '/blogs',
    icon: <FaBlog className="w-5 h-5" />
  },
  { 
    title: 'Gallery', 
    path: '/gallery',
    icon: <FaImages className="w-5 h-5" />
  },
  { 
    title: 'Caretakers', 
    path: '/caretaking',
    icon: <FaUserCog className="w-5 h-5" />
  },
];

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  
  return (
    <div 
      className={`bg-indigo-800 text-white transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-indigo-700">
        {isOpen && <h1 className="text-xl font-bold">PetPulse Hub</h1>}
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 transition-colors duration-200 ${
              location.pathname === item.path
                ? 'bg-indigo-700 text-white'
                : 'text-indigo-100 hover:bg-indigo-700'
            }`}
          >
            <span className="flex items-center justify-center w-6">
              {item.icon}
            </span>
            {isOpen && <span className="ml-3">{item.title}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
