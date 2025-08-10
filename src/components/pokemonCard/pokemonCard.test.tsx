import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonCard from './pokemonCard';

const mockData = {
    id: 1,
    name: 'bulbasaur',
    sprites: { other: { dream_world: { front_default: '' } }, front_default: '' },
    types: [{ type: { name: 'grass' } }],
};

describe('PokemonCard', () => {
    it('renders name and id', () => {
        render(<PokemonCard data={mockData} />);
        expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
        expect(screen.getByText(/001|1/)).toBeInTheDocument();
    });
});


