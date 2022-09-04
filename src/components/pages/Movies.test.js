import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import Movies from './Movies';
// test('Tests if home loads correctly', async () => {
//     const {
//         container,
//         // getByPlaceholderText, 
//         // getByText, 
//         // findByDisplayValue 
//     } = render(
//         <BrowserRouter>
//             <Routes>
//                 <Route path="movies" element={<Movies />} />
//             </Routes>
//         </BrowserRouter>
//     );

//     expect(container).toHaveTextContent(/Movie Genre List/);
// });
test('Movies page rendering', async () => {
    render(<Movies />, { wrapper: BrowserRouter })
    // const user = userEvent.setup()

    // verify page content for default route
    expect(screen.getByText(/Movie Genre List/i)).toBeInTheDocument()

    // verify page content for expected route after navigating
    // await user.click(screen.getByText(/about/i))
    // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
})