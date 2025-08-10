import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './home.page';
import PokemonContext from '../../context/pokemonContext/pokmon.context';

const ctxValue = {
  state: {
    pokemonsList: [],
    isLoading: true,
    isLoadMoreInprogress: false,
  },
  getPokemonData: jest.fn(),
};

describe('HomePage Component', () => {
  test('renders header text and empty state', () => {
    render(
      <PokemonContext.Provider value={ctxValue as any}>
        <HomePage />
      </PokemonContext.Provider>
    );
    expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
    expect(screen.getByText(/No data found/i)).toBeInTheDocument();
  });

  test('calls getPokemonData on "Load more" click', () => {
    render(
      <PokemonContext.Provider value={{ ...ctxValue, state: { ...ctxValue.state, pokemonsList: [{ id: 1, name: 'bulbasaur' }] } }}>
        <HomePage />
      </PokemonContext.Provider>
    );

    const loadMoreButton = screen.getByText(/Load more/i);
    fireEvent.click(loadMoreButton);

    expect(ctxValue.getPokemonData).toHaveBeenCalled();
  });
});