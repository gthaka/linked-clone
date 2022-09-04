import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
// // Side Menu: Dashboard
// test('Renders ', () => {
//     // Render: Navbar
//     const { getByTestId } = render(<Navbar />);

//     // Expect
//     expect(getByTestId('side-menu-link')).toHaveAttribute('🏠')
// });


// // Side Menu: User Preferences
// test('Renders Dashboard correctly', () => {
//     // Render: App
//     const { getByTestId } = render(<Navbar />);

//     // Expect
//     expect(getByTestId('side-menu-link')).toHaveAttribute('User Preferences')
// });

// it("should render list of menu items", () => {
//     render(<Navbar />)
//     const list = screen.getByRole("list", {
//         name: /menu/i,
//     })
//     const { getAllByRole } = within(list)
//     const items = getAllByRole("listitem")
//     expect(items.length).toBe(4)
// })

test('Navbar rendering', async () => {
    render(<Navbar />, { wrapper: BrowserRouter })
    // const user = userEvent.setup()

    // verify page content for default route
    expect(screen.getByText(/🏠/i)).toBeInTheDocument()
    expect(screen.getByText(/Movies/i)).toBeInTheDocument()
    expect(screen.getByText(/Dad Jokes/i)).toBeInTheDocument()
    expect(screen.getByText(/Github Users/i)).toBeInTheDocument()

    // verify page content for expected route after navigating
    // await user.click(screen.getByText(/about/i))
    // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
})