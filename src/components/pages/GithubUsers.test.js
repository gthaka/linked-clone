import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import GithubUsers from './GithubUsers';
// test('Tests if GithubUsers loads correctly', async () => {
//     const {
//         container,
//         // getByPlaceholderText, 
//         // getByText, 
//         // findByDisplayValue 
//     } = render(
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/github-users" element={<GithubUsers />} />
//             </Routes>
//         </BrowserRouter>
//     );

//     expect(container).toHaveTextContent(/Github Users/);


// });

test('Github Users page rendering', async () => {
    render(<GithubUsers />, { wrapper: BrowserRouter })
    // const user = userEvent.setup()

    // verify page content for default route
    expect(screen.getByText(/Github Users/i)).toBeInTheDocument()

    // verify page content for expected route after navigating
    // await user.click(screen.getByText(/about/i))
    // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
})