import { reducer, initialState } from './reducer';

describe('pokemon reducer', () => {
    it('should return the initial state for unknown action', () => {
        const result = reducer(initialState, { type: 'UNKNOWN' });
        expect(result).toEqual(initialState);
    });

    it('should handle SET_POKEMON_LIST', () => {
        const action = { type: 'ACTIONS.SET_POKEMON_LIST', payload: [{ name: 'pikachu' }] };
        const result = reducer(initialState, action);
        expect(result.pokemonsList).toContainEqual({ name: 'pikachu' });
    });

    it('should handle SET_ALL_POKEMON_LIST', () => {
        const action = { type: 'ACTIONS.SET_ALL_POKEMON_LIST', payload: [{ name: 'bulbasaur' }] };
        const result = reducer(initialState, action);
        expect(result.allPokemonsList).toEqual([{ name: 'bulbasaur' }]);
    });

    it('should handle SET_FILTERED_POKEMON_LIST', () => {
        const action = { type: 'ACTIONS.SET_FILTERED_POKEMON_LIST', payload: [{ name: 'charmander' }] };
        const result = reducer(initialState, action);
        expect(result.pokemonsList).toEqual([{ name: 'charmander' }]);
    });

    it('should handle SET_POKEMON_TYPE', () => {
        const action = { type: 'ACTIONS.SET_POKEMON_TYPE', payload: ['fire'] };
        const result = reducer(initialState, action);
        expect(result.pokemonsTypes).toEqual(['fire']);
    });

    it('should handle SET_POKEMON_GENDER_LIST', () => {
        const action = { type: 'ACTIONS.SET_POKEMON_GENDER_LIST', payload: ['male'] };
        const result = reducer(initialState, action);
        expect(result.pokemonGenderList).toEqual(['male']);
    });

    it('should handle SET_API_CALL_INPROGRESS', () => {
        const action = { type: 'ACTIONS.SET_API_CALL_INPROGRESS', payload: false };
        const result = reducer(initialState, action);
        expect(result.isLoading).toBe(false);
    });

    it('should handle SET_LOAD_MORE_API_CALL_INPROGRESS', () => {
        const action = { type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS', payload: true };
        const result = reducer(initialState, action);
        expect(result.isLoadMoreInprogress).toBe(true);
    });

    it('should handle SET_POKEMON_BY_ID', () => {
        const action = { type: 'ACTIONS.SET_POKEMON_BY_ID', payload: { id: 1 } };
        const result = reducer(initialState, action);
        expect(result.pokemonData).toEqual({ id: 1 });
    });

    it('should handle RESET_POKEMON_DATA', () => {
        const state = { ...initialState, pokemonData: { id: 1 } };
        const action = { type: 'ACTIONS.RESET_POKEMON_DATA' };
        const result = reducer(state, action);
        expect(result.pokemonData).toBeNull();
    });

    it('should handle SET_POKEMON_ID', () => {
        const action = { type: 'ACTIONS.SET_POKEMON_ID', payload: 42 };
        const result = reducer(initialState, action);
        expect(result.pokemonSelectedId).toBe(42);
    });
});
