// SignUp.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
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

    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    const { getByLabelText, queryAllByText } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(queryAllByText('Sign Up')[1]);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}",
      });
    });
  });

  it('displays error message if signup fails', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false }),
      })
    );

    const { queryAllByText, getByLabelText } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText('Username'), { target: { value: 'admin' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(queryAllByText('Sign Up')[1]);

    await waitFor(() => {
      expect(queryAllByText('Something went wrong!')[0]).toBeInTheDocument();
    });
  });
});

// test('Clicking on the "Sign in" link navigates to the sign-in page', () => {
//   const { getByTestId } = render(<SignUp />);
//   const signInLink = getByTestId('sign-in-link');
//   fireEvent.click(signInLink);
//   // Assert navigation behavior or any other expectations
// });
