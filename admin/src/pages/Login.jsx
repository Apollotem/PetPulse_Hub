import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { httpRequest } from '../API/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await httpRequest('post', 'api/admin/login', formData);
      
      if (res.adminId) {
        localStorage.setItem('adminId', res.adminId);
        toast.success('Login successful!');
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <img src="./public/images/logoLatest.png" alt="PetPulse Hub" className="mx-auto h-16 w-auto" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your PetPulse Hub Admin account
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-lg transform hover:scale-105 transition-all duration-300 py-8 px-4 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <FormField
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                startIcon={<FaEnvelope className="text-gray-400" />}
                className="w-full"
              />

              <FormField
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                startIcon={<FaLock className="text-gray-400" />}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </div>
          </form>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} PetPulse Hub Admin. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

