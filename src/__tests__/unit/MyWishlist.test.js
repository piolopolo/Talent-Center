/* 
 Author: Dzakira Fabillah
 Date: 05 September 2023
 Desc: Unit testing file of MyWishlist Page. Unit testing should contain : Label checking, datatype checking, mandatory checking, validation

*/

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import MyWishlist from '../../pages/my-wishlist/index'; 
import { MemoryRouter } from 'react-router-dom';


describe('My Wishlist Page', () => {
    it('title exist and spell correctly', () => {
        render(
            <MemoryRouter>
              <MyWishlist />
            </MemoryRouter>
          );


        const title = screen.getByText("My Wishlist");
        expect(title).toBeInTheDocument();
    });

    it('contain navbar', () => {
        render(
          <MemoryRouter>
            <MyWishlist />
          </MemoryRouter>
        );
        
        const navbarText = screen.getByText("Talent Center 79");
        expect(navbarText).toBeInTheDocument();
      });
    
    it('contain remove all button', () => {
        render(
            <MemoryRouter>
              <MyWishlist />
            </MemoryRouter>
          );
        const removeAllButton = screen.getByTestId("remove-all-button"); // Menggunakan testID untuk mengidentifikasi tombol Remove All
        expect(removeAllButton).toBeInTheDocument();
        expect(removeAllButton).toHaveTextContent("Remove All"); // Memeriksa teks tombol
    });
    
    it('request talent button', () => {
        render(
            <MemoryRouter>
              <MyWishlist />
            </MemoryRouter>
          );
        const requestTalentButton = screen.getByTestId("request-talent-button"); // Menggunakan testID untuk mengidentifikasi tombol Request Talent
        expect(requestTalentButton).toBeInTheDocument();
        expect(requestTalentButton).toHaveTextContent("Request Talent"); // Memeriksa teks tombol
    });
    
    it('contain main content (my wishlist)', () => {
        render(
            <MemoryRouter>
              <MyWishlist />
            </MemoryRouter>
          );
        const accordion = screen.getByTestId("content"); // Menggunakan testID untuk mengidentifikasi komponen Accordion
        expect(accordion).toBeInTheDocument();
    });

});