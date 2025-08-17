import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const nameref = useRef<HTMLInputElement>(null);
  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const navigate=useNavigate();

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameref.current?.value;
    const email = emailref.current?.value;
    const password = passwordref.current?.value;

    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/draw-app/signup", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        alert("Signup successful");
        navigate('/signin')
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={signup} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-1">
            Name
          </label>
          <input
            ref={nameref}
            type="text"
            name="name"
            id="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            ref={emailref}
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
            ref={passwordref}
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
