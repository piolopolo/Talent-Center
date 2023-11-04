import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchComponent from '../../components/admin/SearchBox';

test('renders search input field', () => {
  render(<SearchComponent />);
  const searchInput = screen.getByPlaceholderText(/Try "JavaScript"/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders search button', () => {
  render(<SearchComponent />);
  const searchButton = screen.getByLabelText('search');
  expect(searchButton).toBeInTheDocument();
});

test('displays search results', async () => {
  // Mocking the fetchTags function
  const mockFetchTags = jest.fn().mockResolvedValue([
    { skillsetName: 'JavaScript' },
    { skillsetName: 'React' },
  ]);
  jest.mock('apis', () => ({
    fetchTags: mockFetchTags,
  }));

  render(<SearchComponent />);

  const searchInput = screen.getByPlaceholderText(/Try "JavaScript"/i);
  fireEvent.change(searchInput, { target: { value: 'Java' } });

  await screen.findByText('JavaScript');
  await screen.findByText('React');
});

// Add more test cases as needed
