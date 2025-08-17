import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SigninForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
const navigate=useNavigate();
  const signin = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/draw-app/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        alert('Sign in successful');
        localStorage.setItem('token',response.data.token);
        console.log(response.data);
        navigate('/room')
         
        // optionally redirect or save token
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      alert('Sign in failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={signin} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            id="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
