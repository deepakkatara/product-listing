import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header', () => {
    it('renders children', () => {
        render(<Header><div data-testid="content">Hello</div></Header>);
        expect(screen.getByTestId('content')).toHaveTextContent('Hello');
    });
});


