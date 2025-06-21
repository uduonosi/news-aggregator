import React from 'react';
import { render, screen } from '@testing-library/react';
import AppHeader from './AppHeader';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('AppHeader', () => {
  it('renders the title', () => {
    render(<AppHeader />);
    expect(screen.getByRole('heading', { name: /news aggregator/i })).toBeInTheDocument();
  });

  it('renders both navigation links', () => {
    render(<AppHeader />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /search news/i })).toBeInTheDocument();
  });

  it('renders the dark mode toggle', () => {
    render(<AppHeader />);
    expect(screen.getByRole('button', { name: /toggle dark mode/i })).toBeInTheDocument();
  });
});
