import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../redux/store';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading = false, error =  '' }: { loading: boolean, error: String | Object } = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(loading, error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/dashboard');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-indigo-600">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="text-3xl block text-center font-semibold">Login <i className="fa-solid fa-user"></i> </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <hr className="mt-3" />
          {['Email', 'Password'].map((ele, index) => (
            <div className="mt-3" key={index}>
              <label className="block text-base mb-2" htmlFor={ele.toLowerCase()}>{ele}</label>
              <input
                type={ele != "Password" ? "text " : "password"}
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
              className="border-2 border-indigo-700 bg-indigo-700 cursor-pointer text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold">
              {loading ? 'Loading...' : <><i className="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;Login</>}</button>
          </div>
          <div className='flex gap-2 mt-5'>
            <p>Dont Have an account?</p>
            <Link to='/sign-up'>
              <span className='text-blue-500'>Sign up</span>
            </Link>
          </div>
          <p className='text-red-700 mt-5'>
            {/* {error ? ((error?.message !== undefined) ? error?.message : 'Something went wrong!') : ''} */}
          </p>
        </form>
      </div>
    </div>
  );
}
