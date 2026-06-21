import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the authentication screen', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /access dashboard/i })).toBeInTheDocument();
});
