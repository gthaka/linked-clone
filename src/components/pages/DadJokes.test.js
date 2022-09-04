import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import DadJokes from './DadJokes';
// test('Tests if DadJokes loads correctly', async () => {
//     const {
//         container,
//         // getByPlaceholderText,
//         // getByText,
//         // findByDisplayValue
//     } = render(
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/dad-jokes" element={<DadJokes />} />
//             </Routes>
//         </BrowserRouter>
//     );

//     expect(container).toHaveTextContent(/Get Random Joke/);
// });

test('Dad Jokes page rendering', async () => {
    render(<DadJokes />, { wrapper: BrowserRouter })
    // const user = userEvent.setup()

    // verify page content for default route
    expect(screen.getByText(/Get Random Joke/i)).toBeInTheDocument()

    // verify page content for expected route after navigating
    // await user.click(screen.getByText(/about/i))
    // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
})