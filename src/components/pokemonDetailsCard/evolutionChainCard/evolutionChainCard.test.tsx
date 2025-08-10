import React from 'react';
import { render, screen } from '@testing-library/react';
import EvolutionChainCard from './evolutionChainCard';

test('renders evolution chain items', () => {
    render(<EvolutionChainCard data={{ id: 1, name: 'bulbasaur', sprites: { other: { dream_world: {} }, front_default: '' }, types: [{ type: { name: 'grass' } }] } as any} />);
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
});


