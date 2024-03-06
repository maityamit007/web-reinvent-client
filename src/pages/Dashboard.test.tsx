
import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';
import '@testing-library/jest-dom';

describe('Dashboard', () => {
  it('renders Dashboard component correctly', () => {
    const { getByText } = render(<Dashboard/>);
    const homeTitle = getByText('Dashboard Page for Web Re-Invent');
    expect(homeTitle).toBeInTheDocument();
  });
});