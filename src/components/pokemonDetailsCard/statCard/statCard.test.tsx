import React from 'react';
import { render, screen } from '@testing-library/react';
import StatCard from './statCard';

describe('StatCard', () => {
    it('renders stats header and items', () => {
        const stats = [
            { stat: { name: 'hp' }, base_stat: 45 },
            { stat: { name: 'special-attack' }, base_stat: 65 },
        ];
        render(<StatCard stats={stats as any} />);
        expect(screen.getByText(/Stats/i)).toBeInTheDocument();
        expect(screen.getByText(/HP/i)).toBeInTheDocument();
        expect(screen.getAllByText(/65/i).length).toBeGreaterThan(0);
    });
});


