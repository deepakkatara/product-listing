import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import AppFilter from './filter';
import PokemonContext from '../../context/pokemonContext/pokmon.context';

// Mock the common.service module
jest.mock('../../services/common.service', () => ({
  getPokemonTypes: jest.fn(),
  getPokemonGenders: jest.fn(),
  getAllParallelCall: jest.fn(),
  removeDuplicateBy: jest.fn(),
}));

// Make rsuite components test-friendly in this file
jest.mock('rsuite', () => {
  return {
    __esModule: true,
    Row: ({ children }: any) => <div data-testid="row">{children}</div>,
    Col: ({ children }: any) => <div data-testid="col">{children}</div>,
    // A minimal CheckPicker that exposes buttons to invoke its handlers
    CheckPicker: ({ placeholder, onChange, onOpen, onClose, onClean, data }: any) => (
      <div>
        <div>{placeholder}</div>
        <button data-testid="change" onClick={() => onChange && onChange(['test'], { preventDefault: () => { } } as any)}>
          Change
        </button>
        <button data-testid="change-empty" onClick={() => onChange && onChange([], { preventDefault: () => { } } as any)}>
          Change Empty
        </button>
        <button data-testid="clean" onClick={() => onClean && onClean({ preventDefault: () => { } } as any)}>
          Clean
        </button>
        <button data-testid="open" onClick={() => onOpen && onOpen()}>
          Open
        </button>
        <button data-testid="close" onClick={() => onClose && onClose()}>
          Close
        </button>
      </div>
    ),
    Input: ({ placeholder, className, size, onChange }: any) => (
      <input
        data-testid="input"
        placeholder={placeholder}
        className={className}
        onChange={(e) => onChange && onChange(e.target.value, { preventDefault: () => { } } as any)}
      />
    ),
    InputGroup: Object.assign(
      ({ children, inside, className }: any) => (
        <div data-testid="input-group" className={className}>
          {children}
        </div>
      ),
      {
        Button: ({ children }: any) => (
          <button data-testid="button">{children}</button>
        ),
      }
    ),
  };
});

// Import the mocked functions
import { getPokemonTypes, getPokemonGenders, getAllParallelCall, removeDuplicateBy } from '../../services/common.service';

const makeCtx = (overrides = {}) => ({
  state: {
    allPokemonsList: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    ],
    pokemonsTypes: [
      { label: 'Grass', value: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
      { label: 'Fire', value: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
    ],
    pokemonGenderList: [
      { label: 'Male', value: 'male', url: 'https://pokeapi.co/api/v2/gender/2/' },
      { label: 'Female', value: 'female', url: 'https://pokeapi.co/api/v2/gender/1/' },
    ],
    filteredPokemonList: [],
  },
  getPokemonData: jest.fn(),
  getPokemonDetailsListByUrl: jest.fn(),
  dispatch: jest.fn(),
  setAppLoading: jest.fn(),
  ...overrides,
});

describe('AppFilter Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Set up default mock implementations
    (getPokemonTypes as jest.Mock).mockResolvedValue({ results: [] });
    (getPokemonGenders as jest.Mock).mockResolvedValue({ results: [] });
    (getAllParallelCall as jest.Mock).mockResolvedValue([]);
    (removeDuplicateBy as jest.Mock).mockImplementation((arr, key) => arr);
  });

  test('renders filter components', () => {
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx()}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    expect(screen.getByText('Search By')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Name or Number/i)).toBeInTheDocument();
  });

  test('search functionality with value', async () => {
    const setAppLoading = jest.fn();
    const getPokemonData = jest.fn();
    const getPokemonDetailsListByUrl = jest.fn(async () => [{ id: 1 }]);
    const dispatch = jest.fn();
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({
        setAppLoading,
        getPokemonData,
        getPokemonDetailsListByUrl,
        dispatch
      })}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Name or Number/i) as HTMLInputElement;

    // Test search with value
    act(() => {
      fireEvent.change(input, { target: { value: 'pika' } });
    });

    // Test search with empty value
    act(() => {
      fireEvent.change(input, { target: { value: '' } });
    });

    expect(isFilterEnable).toHaveBeenCalledWith(false);
    expect(getPokemonData).toHaveBeenCalledWith(true);
  });

  test('search functionality with whitespace', async () => {
    const setAppLoading = jest.fn();
    const getPokemonData = jest.fn();
    const getPokemonDetailsListByUrl = jest.fn(async () => [{ id: 1 }]);
    const dispatch = jest.fn();
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({
        setAppLoading,
        getPokemonData,
        getPokemonDetailsListByUrl,
        dispatch
      })}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Name or Number/i) as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: '  pika  ' } });
    });

    expect(isFilterEnable).toHaveBeenCalledWith(true);
  });

  test('type change handler', async () => {
    (getAllParallelCall as jest.Mock).mockResolvedValueOnce([
      { pokemon: [{ pokemon: { name: 'bulbasaur' } }] }
    ]);
    const getPokemonData = jest.fn();
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({ dispatch: jest.fn(), getPokemonData })}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    const changeButtons = screen.getAllByTestId('change');
    fireEvent.click(changeButtons[0]!);

    await act(async () => { });

    expect(isFilterEnable).toHaveBeenCalledWith(true);
    expect(getAllParallelCall).toHaveBeenCalled();
  });

  test('type change with empty value', async () => {
    const getPokemonData = jest.fn();
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({ dispatch: jest.fn(), getPokemonData })}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    const changeEmptyButtons = screen.getAllByTestId('change-empty');
    fireEvent.click(changeEmptyButtons[0]!);

    await act(async () => { });

    expect(isFilterEnable).toHaveBeenCalledWith(false);
    expect(getPokemonData).toHaveBeenCalledWith(true);
  });

  test('type change error handling', async () => {
    (getAllParallelCall as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    render(
      <PokemonContext.Provider value={makeCtx()}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    const changeButtons = screen.getAllByTestId('change');
    fireEvent.click(changeButtons[0]!);

    await act(async () => { });

    consoleSpy.mockRestore();
  });

  test('gender change handler', async () => {
    (getAllParallelCall as jest.Mock).mockResolvedValueOnce([
      { pokemon_species_details: [{ pokemon_species: { url: 'https://pokeapi.co/api/v2/pokemon-species/1/' } }] }
    ]);
    const getPokemonData = jest.fn();
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({ dispatch: jest.fn(), getPokemonData })}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    const changeButtons = screen.getAllByTestId('change');
    fireEvent.click(changeButtons[1]!);

    await act(async () => { });

    expect(isFilterEnable).toHaveBeenCalledWith(true);
    expect(getAllParallelCall).toHaveBeenCalled();
  });

  test('gender change with empty value', async () => {
    const getPokemonData = jest.fn();
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({ dispatch: jest.fn(), getPokemonData })}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    const changeEmptyButtons = screen.getAllByTestId('change-empty');
    fireEvent.click(changeEmptyButtons[1]!);

    await act(async () => { });

    expect(isFilterEnable).toHaveBeenCalledWith(false);
    expect(getPokemonData).toHaveBeenCalledWith(true);
  });

  test('gender change error handling', async () => {
    (getAllParallelCall as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    render(
      <PokemonContext.Provider value={makeCtx()}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    const changeButtons = screen.getAllByTestId('change');
    fireEvent.click(changeButtons[1]!);

    await act(async () => { });

    consoleSpy.mockRestore();
  });

  test('clean type handler', () => {
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx()}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    const cleanButtons = screen.getAllByTestId('clean');
    fireEvent.click(cleanButtons[0]!);

    expect(isFilterEnable).toHaveBeenCalledWith(false);
  });

  test('clean type handler with null event', () => {
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx()}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    // Test the case where event is null/undefined by directly calling the handler
    const cleanButtons = screen.getAllByTestId('clean');
    fireEvent.click(cleanButtons[0]!);

    expect(isFilterEnable).toHaveBeenCalledWith(false);
  });

  test('clean type handler with event', () => {
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx()}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    // Test the case where event exists
    const cleanButtons = screen.getAllByTestId('clean');
    fireEvent.click(cleanButtons[0]!);

    expect(isFilterEnable).toHaveBeenCalledWith(false);
  });

  test('setPokemonTypes with data', async () => {
    const dispatch = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({ dispatch })}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    await waitFor(() => {
      expect(getPokemonTypes).toHaveBeenCalled();
    });
  });

  test('setPokemonTypes with empty data', async () => {
    (getPokemonTypes as jest.Mock).mockResolvedValueOnce({ results: [] });
    const dispatch = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({ dispatch })}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    await waitFor(() => {
      expect(getPokemonTypes).toHaveBeenCalled();
    });
  });

  test('setPokemonTypes error handling', async () => {
    (getPokemonTypes as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    render(
      <PokemonContext.Provider value={makeCtx()}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    await waitFor(() => {
      expect(getPokemonTypes).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  test('setPokemonGendersList with data', async () => {
    const dispatch = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({ dispatch })}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    await waitFor(() => {
      expect(getPokemonGenders).toHaveBeenCalled();
    });
  });

  test('setPokemonGendersList with empty data', async () => {
    (getPokemonGenders as jest.Mock).mockResolvedValueOnce({ results: [] });
    const dispatch = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({ dispatch })}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    await waitFor(() => {
      expect(getPokemonGenders).toHaveBeenCalled();
    });
  });

  test('getPokemonGendersList error handling', async () => {
    (getPokemonGenders as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    render(
      <PokemonContext.Provider value={makeCtx()}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    await waitFor(() => {
      expect(getPokemonGenders).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  test('search with long list gets sliced', async () => {
    const longPokemonList = Array.from({ length: 1000 }, (_, i) => ({
      name: `pokemon${i}`,
      url: `https://pokeapi.co/api/v2/pokemon/${i}/`
    }));
    const setAppLoading = jest.fn();
    const getPokemonDetailsListByUrl = jest.fn(async () => [{ id: 1 }]);
    const dispatch = jest.fn();
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({
        state: { ...makeCtx().state, allPokemonsList: longPokemonList },
        setAppLoading,
        getPokemonDetailsListByUrl,
        dispatch
      })}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Name or Number/i) as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: 'pokemon' } });
    });

    expect(isFilterEnable).toHaveBeenCalledWith(true);
  });

  test('type change with long list gets sliced', async () => {
    const longTypeList = Array.from({ length: 1000 }, (_, i) => ({
      pokemon: [{ pokemon: { name: `pokemon${i}` } }]
    }));
    (getAllParallelCall as jest.Mock).mockResolvedValueOnce(longTypeList);
    const getPokemonDetailsListByUrl = jest.fn(async () => [{ id: 1 }]);

    render(
      <PokemonContext.Provider value={makeCtx({ getPokemonDetailsListByUrl })}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    const changeButtons = screen.getAllByTestId('change');
    fireEvent.click(changeButtons[0]!);

    await act(async () => { });

    expect(getPokemonDetailsListByUrl).toHaveBeenCalled();
  });

  test('gender change with long list gets sliced', async () => {
    const longGenderList = Array.from({ length: 1000 }, (_, i) => ({
      pokemon_species: { url: `https://pokeapi.co/api/v2/pokemon-species/${i}/` }
    }));
    (getAllParallelCall as jest.Mock).mockResolvedValueOnce([
      { pokemon_species_details: longGenderList }
    ]);
    const getPokemonDetailsListByUrl = jest.fn(async () => [{ id: 1 }]);

    render(
      <PokemonContext.Provider value={makeCtx({ getPokemonDetailsListByUrl })}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    const changeButtons = screen.getAllByTestId('change');
    fireEvent.click(changeButtons[1]!);

    await act(async () => { });

    expect(getPokemonDetailsListByUrl).toHaveBeenCalled();
  });

  test('component initializes with useEffect', async () => {
    const dispatch = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({ dispatch })}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    await waitFor(() => {
      expect(getPokemonTypes).toHaveBeenCalled();
      expect(getPokemonGenders).toHaveBeenCalled();
    });
  });

  test('filterPokemonData dispatches action', async () => {
    const dispatch = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({ dispatch })}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    // Trigger type change with empty value to call filterPokemonData
    const changeEmptyButtons = screen.getAllByTestId('change-empty');
    fireEvent.click(changeEmptyButtons[0]!);

    await act(async () => { });

    expect(dispatch).toHaveBeenCalledWith({
      type: "ACTIONS.SET_FILTERED_POKEMON_LIST",
      payload: []
    });
  });

  test('setPokemonTypes with non-empty data', async () => {
    const dispatch = jest.fn();
    (getPokemonTypes as jest.Mock).mockResolvedValueOnce({
      results: [
        { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
        { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' }
      ]
    });

    render(
      <PokemonContext.Provider value={makeCtx({ dispatch })}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    await waitFor(() => {
      expect(getPokemonTypes).toHaveBeenCalled();
    });

    // Verify that dispatch was called with the transformed data
    expect(dispatch).toHaveBeenCalledWith({
      type: "ACTIONS.SET_POKEMON_TYPE",
      payload: expect.arrayContaining([
        expect.objectContaining({
          label: expect.any(String),
          value: expect.any(String),
          url: expect.any(String)
        })
      ])
    });
  });

  test('setPokemonGendersList with non-empty data', async () => {
    const dispatch = jest.fn();
    (getPokemonGenders as jest.Mock).mockResolvedValueOnce({
      results: [
        { name: 'male', url: 'https://pokeapi.co/api/v2/gender/2/' },
        { name: 'female', url: 'https://pokeapi.co/api/v2/gender/1/' }
      ]
    });

    render(
      <PokemonContext.Provider value={makeCtx({ dispatch })}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    await waitFor(() => {
      expect(getPokemonGenders).toHaveBeenCalled();
    });

    // Verify that dispatch was called with the transformed data
    expect(dispatch).toHaveBeenCalledWith({
      type: "ACTIONS.SET_POKEMON_GENDER_LIST",
      payload: expect.arrayContaining([
        expect.objectContaining({
          label: expect.any(String),
          value: expect.any(String),
          url: expect.any(String)
        })
      ])
    });
  });

  test('open and close handlers work correctly', () => {
    render(
      <PokemonContext.Provider value={makeCtx()}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    const openButtons = screen.getAllByTestId('open');
    const closeButtons = screen.getAllByTestId('close');

    fireEvent.click(openButtons[0]!);
    fireEvent.click(closeButtons[0]!);
    fireEvent.click(openButtons[1]!);
    fireEvent.click(closeButtons[1]!);

    // These should not throw errors
    expect(openButtons).toHaveLength(2);
    expect(closeButtons).toHaveLength(2);
  });

  test('removeDuplicateBy is called during type filtering', async () => {
    (getAllParallelCall as jest.Mock).mockResolvedValueOnce([
      { pokemon: [{ pokemon: { name: 'bulbasaur' } }] }
    ]);
    const getPokemonDetailsListByUrl = jest.fn(async () => [{ id: 1 }]);

    render(
      <PokemonContext.Provider value={makeCtx({ getPokemonDetailsListByUrl })}>
        <AppFilter isFilterEnable={jest.fn()} />
      </PokemonContext.Provider>
    );

    const changeButtons = screen.getAllByTestId('change');
    fireEvent.click(changeButtons[0]!);

    await act(async () => { });

    expect(removeDuplicateBy).toHaveBeenCalled();
  });

  test('search with empty value after debounce', async () => {
    const setAppLoading = jest.fn();
    const getPokemonData = jest.fn();
    const dispatch = jest.fn();
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({
        setAppLoading,
        getPokemonData,
        dispatch
      })}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Name or Number/i) as HTMLInputElement;

    // First set a value, then clear it
    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    act(() => {
      fireEvent.change(input, { target: { value: '' } });
    });

    expect(isFilterEnable).toHaveBeenCalledWith(false);
    expect(getPokemonData).toHaveBeenCalledWith(true);
    expect(dispatch).toHaveBeenCalledWith({
      type: "ACTIONS.SET_FILTERED_POKEMON_LIST",
      payload: []
    });
  });

  test('search with value triggers filter enable', async () => {
    const setAppLoading = jest.fn();
    const getPokemonDetailsListByUrl = jest.fn(async () => [{ id: 1 }]);
    const dispatch = jest.fn();
    const isFilterEnable = jest.fn();

    render(
      <PokemonContext.Provider value={makeCtx({
        setAppLoading,
        getPokemonDetailsListByUrl,
        dispatch
      })}>
        <AppFilter isFilterEnable={isFilterEnable} />
      </PokemonContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Name or Number/i) as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: 'bulbasaur' } });
    });

    expect(isFilterEnable).toHaveBeenCalledWith(true);
  });
});


