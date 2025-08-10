// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Provide a default global.fetch for tests to avoid network calls
// and ensure components relying on fetch don't crash
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultFetch: any = async (input: RequestInfo | URL) => {
    const url = typeof input === 'string' ? input : (input as URL).toString();
    let body: any = { ok: true };

    if (url.includes('/pokemon?')) {
        body = { next: null, results: [] };
    } else if (url.includes('/pokemon-species')) {
        body = { flavor_text_entries: [] };
    } else if (url.includes('/type/')) {
        body = { damage_relations: {}, results: [] };
    } else if (url.endsWith('/type')) {
        body = { results: [] };
    } else if (url.endsWith('/gender')) {
        body = { results: [] };
    } else if (url.includes('/pokemon/')) {
        body = { id: 1, name: 'bulbasaur', stats: [] };
    }

    return {
        json: async () => body,
    } as any;
};

// Only set if not overridden in individual tests
if (!(global as any).fetch) {
    (global as any).fetch = jest.fn(defaultFetch);
}
