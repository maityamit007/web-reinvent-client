import React from 'react';
import { render, fireEvent, waitFor, getAllByText, getAllByLabelText } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SignIn from './SignIn';
import { signInStart } from '../redux/user/userSlice';
import '@testing-library/jest-dom';

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
    const { queryAllByText, getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    expect(queryAllByText('Login')[0]).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
  });

  it('dispatches signInStart action on form submission', async () => {
    store.dispatch = jest.fn();
    const { queryAllByText, getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(queryAllByText('Login')[1]);

    await waitFor(() => expect(store.dispatch).toHaveBeenCalledWith(signInStart()));
  });
});
