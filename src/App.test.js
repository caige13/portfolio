import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero and section headings', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/client\s?value/i);
  expect(screen.getByText(/Crazy Ape Pickleball/i, { selector: 'h3' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /send it/i })).toBeInTheDocument();
});
