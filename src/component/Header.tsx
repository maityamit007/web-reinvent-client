import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { AppDispatch, AppState } from '../redux/store';
import { signOut } from '../redux/user/userSlice';

export default function Header() {
  const { currentUser } = useSelector((state: AppState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className='bg-indigo-700'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to='/'>
          <h1 className='font-bold text-white'>WEB REINVENT</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/' className='text-white'>
            <li>Home</li>
          </Link>

          <Link to='/sign-in' className='text-white'>
            {currentUser ? (
              <li onClick={() => { handleSignOut() }}>Sign out</li>
            ) : (
              <Link to='/sign-in'>Sign In</Link>
            )}
          </Link>
        </ul>
      </div>
    </nav>
  );
}
