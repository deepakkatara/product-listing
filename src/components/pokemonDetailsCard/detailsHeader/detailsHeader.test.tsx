import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DetailsHeader from './detailsHeader';

describe('DetailsHeader', () => {
    const baseData = {
        id: 25,
        name: 'pikachu',
        sprites: { other: { dream_world: { front_default: '' } }, front_default: '' },
        types: [{ type: { name: 'electric' } }],
    } as any;
    const longText = Array(400).fill('lorem').join(' ');
    const shortText = 'short description';
    const baseSpeciesData = { flavor_text_entries: [{ language: { name: 'en' }, flavor_text: longText }] } as any;

    it('renders name, id, and read more tooltip trigger when long text', () => {
        render(
            <DetailsHeader
                data={baseData}
                speciesData={baseSpeciesData}
                backClick={() => { }}
                closeClick={() => { }}
                forwordClick={() => { }}
            />
        );
        expect(screen.getAllByText(/pikachu/i).length).toBeGreaterThan(0);
        // Match the id using a function matcher to handle possible element splits
        expect(screen.getAllByText((content, node) => node?.textContent === '025').length).toBeGreaterThan(0);
        expect(screen.getByText(/read more/i)).toBeInTheDocument();
    });

    it('renders without read more when description is short', () => {
        const speciesData = { flavor_text_entries: [{ language: { name: 'en' }, flavor_text: shortText }] } as any;
        render(
            <DetailsHeader
                data={baseData}
                speciesData={speciesData}
                backClick={() => { }}
                closeClick={() => { }}
                forwordClick={() => { }}
            />
        );
        expect(screen.getAllByText(/pikachu/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText((content, node) => node?.textContent === '025').length).toBeGreaterThan(0);
        expect(screen.queryByText(/read more/i)).not.toBeInTheDocument();
        expect(screen.getByText(shortText)).toBeInTheDocument();
    });

    it('renders with empty description if speciesData is missing', () => {
        render(
            <DetailsHeader
                data={baseData}
                speciesData={null}
                backClick={() => { }}
                closeClick={() => { }}
                forwordClick={() => { }}
            />
        );
        expect(screen.getAllByText(/pikachu/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText((content, node) => node?.textContent === '025').length).toBeGreaterThan(0);
    });

    it('calls backClick, closeClick, and forwordClick when icons are clicked', () => {
        const backClick = jest.fn();
        const closeClick = jest.fn();
        const forwordClick = jest.fn();
        render(
            <DetailsHeader
                data={baseData}
                speciesData={baseSpeciesData}
                backClick={backClick}
                closeClick={closeClick}
                forwordClick={forwordClick}
            />
        );
        fireEvent.click(screen.getByAltText(/back icon/i));
        fireEvent.click(screen.getByAltText(/close icon/i));
        fireEvent.click(screen.getByAltText(/forword icon/i));
        expect(backClick).toHaveBeenCalled();
        expect(closeClick).toHaveBeenCalled();
        expect(forwordClick).toHaveBeenCalled();
    });

    it('renders correctly with minimal data', () => {
        const minimalData = { id: 1, name: 'bulbasaur', sprites: { other: { dream_world: { front_default: '' } }, front_default: '' }, types: [{ type: { name: 'grass' } }] };
        render(
            <DetailsHeader
                data={minimalData}
                speciesData={{ flavor_text_entries: [] }}
                backClick={() => { }}
                closeClick={() => { }}
                forwordClick={() => { }}
            />
        );
        expect(screen.getAllByText(/bulbasaur/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText((content, node) => node?.textContent === '001').length).toBeGreaterThan(0);
    });
});


