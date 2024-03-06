
import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom';

describe('Home component', () => {
  it('renders Home component correctly', () => {
    const { getByText } = render(<Home />);
    const homeTitle = getByText('Home Page for Web Re-Invent');
    expect(homeTitle).toBeInTheDocument();
  });
});