// SignUp.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from './SignUp';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('SignUp component', () => {
  it('renders SignUp component correctly', () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(getByText('Sign Up'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        }),
      });
    });
  });

  it('displays error message if signup fails', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false }),
      })
    );

    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(getByText('Sign Up'));

    await waitFor(() => {
      expect(getByText('Something went wrong!')).toBeInTheDocument();
    });
  });
});
