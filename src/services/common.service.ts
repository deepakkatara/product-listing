
import { LIMIT, baseURL } from "../constants/apiUrls";

export const initialURL: string = `${baseURL}/pokemon?limit=${LIMIT}`;
export const allPokemonURL: string = `${baseURL}/pokemon?limit=1100`;

export const getPokemonData = async (): Promise<any> => {
  const response = await fetch(`${initialURL}`);
  const result = response.json();
  return result;
};

export const getSpeciesDataById = async (id: number): Promise<any> => {
  const response = await fetch(`${baseURL}/pokemon-species/${id}/`);
  const result = await response.json();
  return result;
};

export const getPokemonTypesById = async (id: number): Promise<any> => {
  const response = await fetch(`${baseURL}/type/${id}/`);
  const result = await response.json();
  return result;
};

export const getPokemonTypes = async (): Promise<any> => {
  const response = await fetch(`${baseURL}/type`);
  const result = await response.json();
  return result;
};

export const getPokemonGenders = async (): Promise<any> => {
  const response = await fetch(`${baseURL}/gender`);
  const result = await response.json();
  return result;
};

export const getPokemonDataById = async (id: number): Promise<any> => {
  const response = await fetch(`${baseURL}/pokemon/${id}/`);
  const result = response.json();
  return result;
};

export const getPokemonDataByURL = async (URL: string): Promise<any> => {
  const response = await fetch(URL);
  const result = response.json();
  return result;
}

export const numberFormation = (number: number | string): string => {
  let n = Number(number);
  if (n < 10) return `00${n}`;
  if (n > 10 && n < 100) return `0${n}`;
  return String(n);
}

export const getAllParallelCall = async (ApiUrls: string[]): Promise<any[]> => {
  return await Promise.all(
    ApiUrls.map(async url => {
      const res = await fetch(url);
      return res.json();
    }));
}

export const removeDuplicateBy = (arr: any[], prop: string): any[] => {
  return [...new Map(arr.map((m) => [m[prop], m])).values()];
}