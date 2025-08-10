import {
  initialURL,
  allPokemonURL,
  getPokemonData,
  getPokemonDataById,
  getPokemonDataByURL,
  getSpeciesDataById,
  getPokemonTypesById,
  getPokemonTypes,
  getPokemonGenders,
  getAllParallelCall,
  numberFormation,
  removeDuplicateBy,
} from './common.service';

describe('common.service', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = {
        json: async () => ({ ok: true, input }),
      };
      return response as Response;
    });
  });

  test('URLs are defined', () => {
    expect(initialURL).toContain('/pokemon?limit=');
    expect(allPokemonURL).toContain('/pokemon?limit=');
  });

  test('numberFormation pads correctly', () => {
    expect(numberFormation(1)).toBe('001');
    expect(numberFormation(25)).toBe('025');
    expect(numberFormation(125)).toBe('125');
  });

  test('removeDuplicateBy removes duplicates by key', () => {
    const arr = [{ name: 'a' }, { name: 'a' }, { name: 'b' }];
    const res = removeDuplicateBy(arr as any, 'name');
    expect(res.length).toBe(2);
  });

  test('fetch helpers call fetch', async () => {
    await getPokemonData();
    expect(global.fetch).toHaveBeenCalled();
    await getPokemonDataById(1);
    expect(global.fetch).toHaveBeenCalled();
    await getPokemonDataByURL('https://pokeapi.co/api/v2/pokemon/1');
    expect(global.fetch).toHaveBeenCalled();
  });

  test('getSpeciesDataById fetches species data', async () => {
    const data = await getSpeciesDataById(1);
    expect(data).toEqual({ ok: true, input: expect.any(String) });
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/pokemon-species/1/'));
  });

  test('getPokemonTypesById fetches type data', async () => {
    const data = await getPokemonTypesById(1);
    expect(data).toEqual({ ok: true, input: expect.any(String) });
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/type/1/'));
  });

  test('getPokemonTypes fetches all types', async () => {
    const data = await getPokemonTypes();
    expect(data).toEqual({ ok: true, input: expect.any(String) });
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/type'));
  });

  test('getPokemonGenders fetches all genders', async () => {
    const data = await getPokemonGenders();
    expect(data).toEqual({ ok: true, input: expect.any(String) });
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/gender'));
  });

  test('getAllParallelCall fetches data in parallel', async () => {
    const urls = ['https://pokeapi.co/api/v2/pokemon/1', 'https://pokeapi.co/api/v2/pokemon/2'];
    const data = await getAllParallelCall(urls);
    expect(data.length).toBe(urls.length);
    expect(global.fetch).toHaveBeenCalledTimes(urls.length);
  });
});