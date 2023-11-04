/* 
 Author: Dzakira Fabillah
 Date: 05 September 2023
 Desc: Integrtion Testing

*/
import { render, screen, fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LandingPage from '../../pages/home/index'; 
import { handleDownloadCV } from '../../pages/detail/index';

describe('Integration Testing', () => {

    it('Client melakukan sign in - main - detail - download cv - add to wishlist - go to my wishlist page - request - go to my request talent', () => {
        const history = createMemoryHistory();
    
        render(
          <MemoryRouter>
            <LandingPage />
          </MemoryRouter>
        );

        // sign in and navigate to main
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

        // detail
        const talentId = 27;
        const talentName = 'Alexa';

        setTimeout(() => {
          const detailSomeTalent = screen.getByTestId('detail-talent-'+ talentId.toString());
          expect(detailSomeTalent).toBeInTheDocument();
          fireEvent.click(detailSomeTalent);
        }, 5000); 


        setTimeout(() => {
          expect(history.location.pathname).toBe('/detail/'+talentId.toString());
        }, 1000); // 1000ms = 1 detik

        //download cv
        
        // Mock fungsi downloadCV untuk mengembalikan Promise kosong
        jest.spyOn(global, 'fetch').mockResolvedValue({});

        // Pastikan fungsi handleDownloadCV dipanggil dengan parameter yang benar
        setTimeout(() => {
          fireEvent.click(screen.getByText('Download CV'));
          expect(handleDownloadCV).toHaveBeenCalledWith(talentId, talentName);
        }, 2000); 

        // add to wishlist
        setTimeout(() => {
          fireEvent.click(screen.getByText('Add to List'));
          const succesAlertMessage =  screen.getByText('Added to wishlist successfully');
          expect(succesAlertMessage).toBeInTheDocument();
        }, 2000); 

        // go to my wishlist page 
        setTimeout(() => {
          const myWishlistButton = screen.getByTestId('my-wishlist-icon-button');
          fireEvent.click(myWishlistButton);
        }, 2000); 
        

        setTimeout(() => {
          expect(history.location.pathname).toBe('/wishlist');
        }, 1000); // 1000ms = 1 detik

        // add to request
        
        setTimeout(() => {
          fireEvent.click(screen.getByText('Request Talent'));
          const requestTalentSuccessAlert = screen.getByText("Seluruh data wishlist user ini berhasil di request");
          expect(requestTalentSuccessAlert).toBeInTheDocument();
        }, 2000); // 1000ms = 1 detik

        // my request page
        setTimeout(() => {
          const navbarUserDropdown = screen.getByTestId('navbar-user-dropdown');
          const goToMyRequestPageButton = screen.getByTestId('go-to-my-request-button');

          fireEvent.click(navbarUserDropdown);
          fireEvent.click(goToMyRequestPageButton);
        }, 2000); // 1000ms = 1 detik
        

        setTimeout(() => {
          expect(history.location.pathname).toBe('/my-request');
        }, 1000); // 1000ms = 1 detik

        setTimeout(() => {
          fireEvent.click(screen.getByText('In Progress'));
          const talentAccordionItem = screen.getByTestId('accordion-item-'+talentId.toString());
          expect(talentAccordionItem).toBeInTheDocument();
        }, 1000); // 1000ms = 1 detik

      });

});