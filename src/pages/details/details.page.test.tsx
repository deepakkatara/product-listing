import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import DetailPage from './details.page';

import { getPokemonDataById, getSpeciesDataById, getPokemonTypesById } from '../../services/common.service';

jest.mock('../../services/common.service', () => ({
    getPokemonDataById: jest.fn(),
    getSpeciesDataById: jest.fn(),
    getPokemonTypesById: jest.fn(),
    numberFormation: jest.fn((num) => num.toString().padStart(3, '0')),
}));

describe('DetailPage Component', () => {
    beforeEach(() => {
        (getPokemonDataById as jest.Mock).mockResolvedValue({
            id: 1,
            name: 'bulbasaur',
            stats: [
                { stat: { name: 'hp' }, base_stat: 45 },
                { stat: { name: 'attack' }, base_stat: 49 },
            ],
            sprites: { front_default: 'test.png' },
            types: [{ type: { name: 'grass' } }],
            height: 7,
            weight: 69,
            abilities: [
                { ability: { name: 'overgrow' }, is_hidden: false },
                { ability: { name: 'chlorophyll' }, is_hidden: true },
            ],
        });
        (getSpeciesDataById as jest.Mock).mockResolvedValue({
            flavor_text_entries: [
                {
                    flavor_text: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
                    language: { name: 'en' },
                },
            ],
            evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1/' },
            egg_groups: [
                { name: 'monster' },
                { name: 'plant' },
            ],
        });
        (getPokemonTypesById as jest.Mock).mockResolvedValue({
            damage_relations: {
                double_damage_from: [
                    { name: 'fire' },
                    { name: 'ice' },
                ],
            },
        });
    });

    test('renders modal when isCardSelected', async () => {
        await act(async () => {
            render(<DetailPage isCardSelected toggleModal={() => { }} pokemonId={1} offset={10} />);
        });

        // Wait for the component to load and render
        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument();
        });
    });

    test('handles forward and backward clicks', async () => {
        const toggleModal = jest.fn();

        await act(async () => {
            render(<DetailPage isCardSelected toggleModal={toggleModal} pokemonId={1} offset={10} />);
        });

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByAltText(/forword icon to go backword/i)).toBeInTheDocument();
            expect(screen.getByAltText(/back icon to go backword/i)).toBeInTheDocument();
        });

        const forwardButton = screen.getByAltText(/forword icon to go backword/i);
        const backButton = screen.getByAltText(/back icon to go backword/i);

        await act(async () => {
            fireEvent.click(forwardButton);
            fireEvent.click(backButton);
        });

        expect(toggleModal).not.toHaveBeenCalled();
    });

    test('displays correct Pokemon details', async () => {
        await act(async () => {
            render(<DetailPage isCardSelected toggleModal={() => { }} pokemonId={1} offset={10} />);
        });

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument();
        });

        // Use more specific selectors to avoid conflicts with multiple elements
        expect(screen.getByText(/Height/i)).toBeInTheDocument();
        expect(screen.getByText(/Weight/i)).toBeInTheDocument();
        expect(screen.getByText(/Abilities/i)).toBeInTheDocument();
        expect(screen.getByText(/Types/i)).toBeInTheDocument();
        expect(screen.getByText(/Weak Against/i)).toBeInTheDocument();
    });

    test('displays Pokemon stats correctly', async () => {
        await act(async () => {
            render(<DetailPage isCardSelected toggleModal={() => { }} pokemonId={1} offset={10} />);
        });

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument();
        });

        expect(screen.getByText(/Stats/i)).toBeInTheDocument();
        expect(screen.getByText(/HP/i)).toBeInTheDocument();
        expect(screen.getByText(/Attack/i)).toBeInTheDocument();
        expect(screen.getByText('45', { selector: '.stat-data' })).toBeInTheDocument();
        expect(screen.getByText('49', { selector: '.stat-data' })).toBeInTheDocument();
    });

    test('displays Pokemon abilities correctly', async () => {
        await act(async () => {
            render(<DetailPage isCardSelected toggleModal={() => { }} pokemonId={1} offset={10} />);
        });

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument();
        });

        expect(screen.getByText(/Overgrow/i)).toBeInTheDocument();
        expect(screen.getByText(/Chlorophyll/i)).toBeInTheDocument();
    });

    test('displays Pokemon types correctly', async () => {
        await act(async () => {
            render(<DetailPage isCardSelected toggleModal={() => { }} pokemonId={1} offset={10} />);
        });

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument();
        });

        expect(screen.getByText(/Grass/i)).toBeInTheDocument();
    });

    test('displays weak against types correctly', async () => {
        await act(async () => {
            render(<DetailPage isCardSelected toggleModal={() => { }} pokemonId={1} offset={10} />);
        });

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument();
        });

        expect(screen.getByText(/Fire/i)).toBeInTheDocument();
        expect(screen.getByText(/Ice/i)).toBeInTheDocument();
    });

    test('displays egg groups correctly', async () => {
        await act(async () => {
            render(<DetailPage isCardSelected toggleModal={() => { }} pokemonId={1} offset={10} />);
        });

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument();
        });

        expect(screen.getByText(/Monster/i)).toBeInTheDocument();
        // Use a more specific selector to avoid conflict with the description text
        const plantElements = screen.getAllByText(/Plant/i);
        expect(plantElements.length).toBeGreaterThan(0);
    });

    test('displays Pokemon description correctly', async () => {
        await act(async () => {
            render(<DetailPage isCardSelected toggleModal={() => { }} pokemonId={1} offset={10} />);
        });

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument();
        });

        expect(screen.getByText(/A strange seed was planted on its back at birth/i)).toBeInTheDocument();
    });
});