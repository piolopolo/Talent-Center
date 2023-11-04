import { render, screen, fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history'; 
import LandingPage from '../../pages/home/index'; 

describe('SignInLayout Unit Testing', () => {
  
  it('renders login form', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Sign In'));
    
    // Ensure that the form elements are rendered
    const title = screen.getByText("Welcome Back")
    const subTitle = screen.getByText("Please sign in first to explore further on our website")
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');
    
    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('should open modal when clicking on a button', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    const signInModalMessage = 'Please sign in first to explore further on our website';
    const result = screen.queryByText(signInModalMessage );

    expect(result).toBeNull();

    fireEvent.click(screen.getByText('Sign In'));

    // Check if sign in modal is now visible
    const signInMessage = screen.getByText(signInModalMessage);
    expect(signInMessage).toBeInTheDocument();
  });

  it('should close modal when clicking close button', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    const signInModalMessage = 'Please sign in first to explore further on our website';  
    const result = screen.queryByText(signInModalMessage );
    expect(result).toBeNull();

    fireEvent.click(screen.getByText('Sign In'));

    const modalCloseButton = screen.getByTestId('close-signin-modal-button');

    expect(modalCloseButton).toBeInTheDocument();

    fireEvent.click(modalCloseButton);

    // check if sign modal closed
    const result2 = screen.queryByText(signInModalMessage );

    setTimeout(() => {
      expect(result2).not.toBeInTheDocument();
    }, 1000); // 1000ms = 1 detik


  })

  it('should update signInInput when email and password inputs change', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Sign In'));

    // Get the email and password inputs
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    // Simulate typing in the email and password inputs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
  })

  it('displays error message on invalid login (blank email)', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Sign In'));


    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);
    
    const errorMessage = screen.getByText('Kolom email tidak boleh kosong');
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays error message on invalid login (blank password)', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Sign In'));


    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: 'user@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(loginButton);
    
    const errorMessage = screen.getByText('Kolom password tidak boleh kosong');
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays error message on invalid login (blank email and password)', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Sign In'));


    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(loginButton);
    
    const errorMessage = screen.getByText('Kolom Email dan password tidak boleh kosong');
    expect(errorMessage).toBeInTheDocument();
  });

  it('navigate to main page on valid login', () => {
    const history = createMemoryHistory();

    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Sign In'));
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(emailInput, { target: { value: 'inigmail@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Sateayam27' } });
    fireEvent.click(loginButton);

    setTimeout(() => {
      expect(history.location.pathname).toBe('/main');
    }, 1000); // 1000ms = 1 detik
  });

});