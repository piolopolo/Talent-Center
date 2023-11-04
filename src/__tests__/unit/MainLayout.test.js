import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'; 
import MainLayout from '../../pages/home/index'; 

describe('MainLayout component', () => {
  beforeEach(() => {
  });

  it('renders without errors', () => {
    render(<MainLayout />);
    // The component should render without throwing errors
  });

  it('displays talents correctly', () => {
    // Assuming there are talents rendered on the screen
    render(<MainLayout />);
    const talentCards = screen.queryAllByTestId('profile-card');
    expect(talentCards.length).toBeGreaterThan(0);
  });

  it('opens and closes the drawer when Filter button is clicked', () => {
    render(<MainLayout />);
    const filterButton = screen.getByRole('button', { name: 'Filter' });
    fireEvent.click(filterButton);

    const drawer = screen.getByRole('dialog');
    expect(drawer).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);
    expect(drawer).not.toBeInTheDocument();
  });

  it('changes entries per page when ToggleButton is clicked', () => {
    render(<MainLayout />);
    const toggleButtons = screen.getAllByRole('button', { name: /Entries/ });

    userEvent.click(toggleButtons[1]); // Click the second ToggleButton

    const selectedButton = screen.getByRole('button', { name: /20/ });
    expect(selectedButton).toHaveClass('Mui-selected');
  });

  // Add more tests as needed
});
