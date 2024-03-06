import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-indigo-600">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="text-3xl block text-center font-semibold" id="sign-up-title">Sign Up <i className="fa-solid fa-user-plus"></i></h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <hr className="mt-3" />
          {['Username', 'Email', 'Password'].map((ele, index) => (
            <div className="mt-3" key= {index}>
              <label htmlFor={ele.toLowerCase()} className="block text-base mb-2">{ele}</label>
              <input
                type={ele != "Password" ? "text" : "password"}
                id={ele.toLowerCase()}
                onChange={handleChange}
                className="border w-full text-base p-2 rounded-lg focus:outline-none focus:ring-0 focus:border-gray-600"
                placeholder={`Enter ${ele}...`} />
            </div>
          ))}   
          <div className="mt-5">
            <button
              type="submit"
              disabled={loading}
              data-testid="sign-up-button-container"
              className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold">
              {loading ? 'Loading...' : <><i className="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;Sign Up</>}</button>
          </div>
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to='/sign-in'>
            <span className='text-blue-500'>Sign in</span>
          </Link>
        </div>
        <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      </div>
    </div>
  );
}
