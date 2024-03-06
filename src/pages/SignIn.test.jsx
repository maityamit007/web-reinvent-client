import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SignIn from './SignIn';
import { signInStart } from '../redux/user/userSlice';

// Mocking redux store
const mockStore = configureStore([]);

describe('SignIn component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      user: {
        loading: false,
        error: null,
      },
    });
  });

  it('renders SignIn component correctly', () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('Login')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
  });

  it('dispatches signInStart action on form submission', async () => {
    store.dispatch = jest.fn();
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(getByText('Login'));

    await waitFor(() => expect(store.dispatch).toHaveBeenCalledWith(signInStart()));
  });
});
