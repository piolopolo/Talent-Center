import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterLayout from '../../components/admin/RegisterLayout';

describe('RegisterLayout', () => {
  test('renders the Register button', () => {
    render(<RegisterLayout />);
    const registerButton = screen.getByText('Register');
    expect(registerButton).toBeInTheDocument();
  });

  test('opens the dialog when Register button is clicked', () => {
    render(<RegisterLayout />);
    const registerButton = screen.getByText('Register');
    fireEvent.click(registerButton);
    const dialog = screen.queryByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  test('displays correct password validation messages', () => {
    render(<RegisterLayout />);
    const passwordInput = screen.getByPlaceholderText('Type in your password again');

    // Check for validation messages before typing anything
    const lengthValidationMessage = screen.getByText(/Password is at least 8 characters long/i);
    const numberValidationMessage = screen.getByText(/Password contains at least one letter and one number/i);

    expect(lengthValidationMessage).toHaveTextContent('Password is at least 8 characters long');
    expect(numberValidationMessage).toHaveTextContent('Password contains at least one letter and one number');

    // Typing a valid password
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });

    // Check for updated validation messages after typing a valid password
    const validLengthIcon = screen.getByText('Password is at least 8 characters long');
    const validNumberIcon = screen.getByText('Password contains at least one letter and one number');

    expect(validLengthIcon).toBeInTheDocument();
    expect(validNumberIcon).toBeInTheDocument();
  });
});
