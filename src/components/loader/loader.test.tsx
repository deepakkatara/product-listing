import React from 'react';
import { render, screen } from '@testing-library/react';
import Apploader from './loader';

test('shows loader content', () => {
    render(<Apploader className="c" />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});


