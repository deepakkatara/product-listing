import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyCard from './propertyCard';

describe('PropertyCard', () => {
    it('renders key property labels and values', () => {
        const data = {
            height: 7,
            weight: 69,
            abilities: [{ ability: { name: 'overgrow' } }],
            types: [{ type: { name: 'grass' } }],
        };
        const speciesData = { egg_groups: [{ name: 'monster' }] };
        const pokemonTypeData = { damage_relations: { double_damage_from: [{ name: 'fire' }] } };

        render(<PropertyCard speciesData={speciesData} data={data} pokemonTypeData={pokemonTypeData} />);
        expect(screen.getByText(/Height/i)).toBeInTheDocument();
        expect(screen.getByText(/Weight/i)).toBeInTheDocument();
        expect(screen.getByText(/Abilities/i)).toBeInTheDocument();
        expect(screen.getByText(/Types/i)).toBeInTheDocument();
        expect(screen.getByText(/Weak Against/i)).toBeInTheDocument();
    });
});


