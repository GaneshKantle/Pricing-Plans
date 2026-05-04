import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the WI Thinkers services home page', () => {
  render(<App />);

  expect(screen.getByRole('heading', { level: 1, name: /magazine services/i })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /home/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /contact/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /view plans/i }).length).toBeGreaterThan(0);
});
