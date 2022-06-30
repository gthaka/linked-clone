import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import Home from './Home';
test('Tests if home loads correctly', async () => {
    const {
        container,
        // getByPlaceholderText, 
        // getByText, 
        // findByDisplayValue 
    } = render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );

    expect(container).toHaveTextContent(/Trial and See 👁️/);
});