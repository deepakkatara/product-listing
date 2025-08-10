import * as actions from './pokemonAction';

describe('pokemonAction constants', () => {
    it('should export all action constants', () => {
        expect(actions.GET_POKEMON_LIST).toBeDefined();
        expect(actions.SET_POKEMON_LIST).toBeDefined();
        expect(actions.SET_ALL_POKEMON_LIST).toBeDefined();
        expect(actions.GET_POKEMON_BY_ID).toBeDefined();
        expect(actions.SET_POKEMON_BY_ID).toBeDefined();
        expect(actions.SET_POKEMON_ID).toBeDefined();
        expect(actions.RESET_POKEMON_DATA).toBeDefined();
        expect(actions.SET_API_CALL_INPROGRESS).toBeDefined();
    });
});
