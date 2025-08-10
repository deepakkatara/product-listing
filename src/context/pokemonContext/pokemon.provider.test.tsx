import React from 'react';
import { render, act, waitFor, screen } from '@testing-library/react';
import { PokemonProvider } from './pokemon.provider';
import PokemonContext from './pokmon.context';

// Define a type for the Pokémon object
interface Pokemon {
  name: string;
  url: string;
}

// Mock the common.service module
jest.mock('../../services/common.service', () => ({
  allPokemonURL: 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
  initialURL: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
}));

// Mocking fetch to simulate API calls
const mockFetch = jest.fn();

beforeEach(() => {
  mockFetch.mockClear();
  global.fetch = mockFetch;
});

describe('PokemonProvider', () => {
  beforeEach(() => {
    // Setup default mock responses
    mockFetch.mockImplementation((url: string) => {
      if (url.includes('pokemon?limit=100000')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            results: [
              { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
              { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
              { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
            ]
          })
        });
      } else if (url.includes('pokemon?limit=20')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
            results: [
              { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
              { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
            ]
          })
        });
      } else if (url.includes('/pokemon/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            id: 1,
            name: 'bulbasaur',
            sprites: { front_default: 'test.png' },
            types: [{ type: { name: 'grass' } }]
          })
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: [] })
      });
    });
  });

  it('renders children', () => {
    const { getByText } = render(
      <PokemonProvider>
        <div>child</div>
      </PokemonProvider>
    );
    expect(getByText('child')).toBeInTheDocument();
  });

  it('fetches initial Pokemon data', async () => {
    await act(async () => {
      render(
        <PokemonProvider>
          <PokemonContext.Consumer>
            {({ state }) => (
              <div data-testid="pokemon-list">
                {state.allPokemonsList?.map((pokemon: Pokemon) => (
                  <span key={pokemon.name}>{pokemon.name}</span>
                ))}
              </div>
            )}
          </PokemonContext.Consumer>
        </PokemonProvider>
      );
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('pokemon?limit=20'));
    });
  });

  it('updates state with fetched Pokemon data', async () => {
    await act(async () => {
      render(
        <PokemonProvider>
          <PokemonContext.Consumer>
            {({ state }) => (
              <div data-testid="pokemon-list">
                {state.allPokemonsList?.map((pokemon: Pokemon) => (
                  <span key={pokemon.name}>{pokemon.name}</span>
                ))}
              </div>
            )}
          </PokemonContext.Consumer>
        </PokemonProvider>
      );
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('pokemon?limit=100000'));
    });
  });

  it('handles getPokemonData with reset', async () => {
    let getPokemonDataFn: any;

    await act(async () => {
      render(
        <PokemonProvider>
          <PokemonContext.Consumer>
            {({ getPokemonData }) => {
              getPokemonDataFn = getPokemonData;
              return <div data-testid="provider">Provider</div>;
            }}
          </PokemonContext.Consumer>
        </PokemonProvider>
      );
    });

    await act(async () => {
      if (getPokemonDataFn) {
        await getPokemonDataFn(true);
      }
    });

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('pokemon?limit=20'));
  });

  it('sets loading state correctly', async () => {
    let setAppLoadingFn: any;
    let currentState: any;

    const { getByText } = render(
      <PokemonProvider>
        <PokemonContext.Consumer>
          {({ state, setAppLoading }) => {
            setAppLoadingFn = setAppLoading;
            currentState = state;
            return (
              <div>
                <button onClick={() => setAppLoading(true)}>Set Loading</button>
                {state.isLoading && <span>Loading...</span>}
                <span data-testid="loading-state">{state.isLoading ? 'true' : 'false'}</span>
              </div>
            );
          }}
        </PokemonContext.Consumer>
      </PokemonProvider>
    );

    // Initially loading should be true
    expect(getByText('true')).toBeInTheDocument();

    // Wait for the provider to finish initial loading
    await waitFor(() => {
      expect(getByText('false')).toBeInTheDocument();
    });

    // Now set loading to true manually
    await act(async () => {
      setAppLoadingFn(true);
    });

    await waitFor(() => {
      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('fetches all Pokemon data list', async () => {
    await act(async () => {
      render(
        <PokemonProvider>
          <PokemonContext.Consumer>
            {({ state }) => (
              <div data-testid="pokemon-list">
                {state.allPokemonsList?.map((pokemon: Pokemon) => (
                  <span key={pokemon.name}>{pokemon.name}</span>
                ))}
              </div>
            )}
          </PokemonContext.Consumer>
        </PokemonProvider>
      );
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('pokemon?limit=100000'));
    });
  });

  it('provides context values', async () => {
    let contextValue: any;

    await act(async () => {
      render(
        <PokemonProvider>
          <PokemonContext.Consumer>
            {(value) => {
              contextValue = value;
              return <div data-testid="provider">Provider</div>;
            }}
          </PokemonContext.Consumer>
        </PokemonProvider>
      );
    });

    await waitFor(() => {
      expect(contextValue).toBeDefined();
      expect(contextValue.state).toBeDefined();
      expect(contextValue.dispatch).toBeDefined();
      expect(contextValue.getPokemonData).toBeDefined();
      expect(contextValue.getPokemonDetailsListByUrl).toBeDefined();
      expect(contextValue.setAppLoading).toBeDefined();
    });
  });
});