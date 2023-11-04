import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import TalentApproval from '../../pages/admin/TalentApproval';

describe('Talent Approval Page Test', () => { 

    describe('Talent Approval Sidebar Component', () => {
        it('contain sidebar item name correctly', () => {
            render(<TalentApproval />)
            const sidebarItemTexts = ['Dashboard', 'Daftar Talent', 'Daftar Client', 'Daftar Persetujuan Talent', 'Kelola User'];
            sidebarItemTexts.forEach((text) => {
                const sidebarItem = screen.getByText(text);
                expect(sidebarItem).toBeInTheDocument();
              });

        })

        it('renders collapse button and collapse button work correctly', () => {
            render(<TalentApproval />);
            
            const collapseButton = screen.getByText('Collapse');
            expect(collapseButton).toBeInTheDocument();

            fireEvent.click(collapseButton);

            const sidebarItemTexts = ['Dashboard', 'Daftar Talent', 'Daftar Client', 'Daftar Persetujuan Talent', 'Kelola User'];
            sidebarItemTexts.forEach((text) => {
                const sidebarItem = screen.getByText(text);
                expect(sidebarItem).not.toBeInTheDocument();
              });
          });
    })

    describe('Talent Approval Appbar Component', () => {
        it('renders "Appbar"', () => {
            render(<TalentApproval />)
        })

        it('contain laguage selection, notification, and avatar', () => {
            render(<TalentApproval />)
        })
    })

    describe('Talent Approval Footer Component', () => {
        it('renders "Footer" component', () => {
            render(<TalentApproval />)
        })

        it('contain copyright text correctly', () => {
            render(<TalentApproval />)
        })
    })

    describe('Talent Approval "Main" Component', () => {
        it('contain title', () => {
            render(<TalentApproval />)
        })
        
        it('renders table component', () => {
            render(<TalentApproval />)
        })

        it('renders autocomplete and combobox', () => {
            render(<TalentApproval />)
        })

        it('contain correct table head', () => {
            render(<TalentApproval />)
            const tableHeadTexts = ['Instansi', 'Tanggal Request', 'Talent yang dipilih', 'Status', 'Action'];
            tableHeadTexts.forEach((text) => {
                const sidebarItem = screen.getByText(text);
                expect(sidebarItem).toBeInTheDocument();
              });
        })

        it('contain correct condition of action icons', () => {
            render(<TalentApproval />)
        })

        it('show approval dialog when approve icon clicked', () => {
            render(<TalentApproval />)
        })

        it('show reject dialog when reject icon clicked', () => {
            render(<TalentApproval />)
        })
    })

    describe('Approval Dialog', () => {
        it('contain correct text information', () => {
            render(<TalentApproval />)
        })

        it('contain cancel and approve button', () => {
            render(<TalentApproval />)
        })

        it('show alert when approve button clicked', () => {
            render(<TalentApproval />)
        })
    })

    describe('Reject Dialog', () => {
        it('contain correct text information', () => {
            render(<TalentApproval />)
        })

        it('contain textbox, cancel button and reject button', () => {
            render(<TalentApproval />)
        })

        it('show alert when approve button clicked', () => {
            render(<TalentApproval />)
        })
    })


})
