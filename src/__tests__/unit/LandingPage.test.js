import { render, screen } from '@testing-library/react';
import LandingPage from '../../pages/home/index'; 

test('renders welcome text', () => {
  render(<LandingPage />);
  const welcomeTextElement = screen.getByText(/Welcome to\nTalent Center 79/i);
  expect(welcomeTextElement).toBeInTheDocument();
});

test('renders search box', () => {
  render(<LandingPage />);
  const searchBoxElement =screen.getByTestId('search-bar-element');
  expect(searchBoxElement).toBeInTheDocument();
});

test('renders popular tags', () => {
  render(<LandingPage />);
  const popularTagElement = screen.getByText(/Popular/i);
  expect(popularTagElement).toBeInTheDocument();
});

// Add more test cases as needed
