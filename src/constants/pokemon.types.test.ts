import { getPokcolor, getBackground, getPokemonDescription, getCamleCaseString } from './pokemon.types';

describe('pokemon.types helpers', () => {
    test('getPokcolor returns known and unknown colors', () => {
        expect(getPokcolor('fire')).toBeDefined();
        expect(getPokcolor('does-not-exist')).toBeDefined();
    });

    test('getBackground with one and two types', () => {
        const one = [{ type: { name: 'grass' } }];
        const two = [{ type: { name: 'grass' } }, { type: { name: 'poison' } }];
        expect(getBackground(one)).toMatch(/#/);
        expect(getBackground(two)).toMatch(/linear-gradient/);
    });

    test('getPokemonDescription aggregates and cleans english flavor text', () => {
        const data = [
            { language: { name: 'en' }, flavor_text: 'Hello\nWorld' },
            { language: { name: 'en' }, flavor_text: 'Hello\nWorld' }, // duplicate
            { language: { name: 'jp' }, flavor_text: 'Ignored' },
        ];
        const desc = getPokemonDescription(data as any);
        expect(desc).toContain('Hello World');
    });

    test('getCamleCaseString capitalizes first char', () => {
        expect(getCamleCaseString('bulbasaur')).toBe('Bulbasaur');
        expect(getCamleCaseString('')).toBe('');
    });
});


