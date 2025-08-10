export const POKEMON_TYPE = Object.freeze({
  nomrnal: {
    color: "#DDCBD0",
    hex: ""
  },
  fighting: {
    color: "#FCC1B0",
    hex: ""
  },
  flying: {
    color: "#B2D2E8",
    hex: ""
  },
  poison: {
    color: "#CFB7ED",
    hex: ""
  },
  ground: {
    color: "#F4D1A6",
    hex: ""
  },
  rock: {
    color: "#C5AEA8",
    hex: ""
  },
  bug: {
    color: "#C1E0C8",
    hex: ""
  },
  ghost: {
    color: "#D7C2D7",
    hex: ""
  },
  steel: {
    color: "#C2D4CE",
    hex: ""
  },
  fire: {
    color: "#EDC2C4",
    hex: ""
  },
  water: {
    color: "#CBD5ED",
    hex: ""
  },
  grass: {
    color: "#C0D4C8",
    hex: ""
  },
  electric: {
    color: "#E2E2A0",
    hex: ""
  },
  psychic: {
    color: "#DDC0CF",
    hex: ""
  },
  ice: {
    color: "#C7D7DF",
    hex: ""
  },
  dragon: {
    color: "#CADCDF",
    hex: ""
  },
  dark: {
    color: "#C6C5E3",
    hex: ""
  },
  fairy: {
    color: "#E4C0CF",
    hex: ""
  },
  unknown: {
    color: "#C0DFDD",
    hex: ""
  },
  shadow: {
    color: "#CACACA",
    hex: ""
  }
} as const);

export const getPokcolor = (type: string): string => {
  return (POKEMON_TYPE as any)[type] ? (POKEMON_TYPE as any)[type].color : (POKEMON_TYPE as any)['unknown'].color;
}

export const getBackground = (pokemonTypes?: any[] | null): string => {
  if (!Array.isArray(pokemonTypes) || pokemonTypes.length === 0) {
    return getPokcolor('unknown');
  }

  const typeName1: string | undefined = pokemonTypes[0]?.type?.name;
  if (!typeName1) {
    return getPokcolor('unknown');
  }

  if (pokemonTypes.length > 1) {
    const typeName2: string | undefined = pokemonTypes[1]?.type?.name;
    if (typeName2) {
      return `linear-gradient(180deg, ${getPokcolor(typeName1)} 0%, ${getPokcolor(typeName2)} 100%)`;
    }
  }

  return getPokcolor(typeName1);
}

export const getPokemonDescription = (data: any[] = []): string => {
  if (data.length) {
    const uniqueTextArray: string[] = [];
    return data.reduce((acc: string, next: any) => {
      if (next.language.name === "en" && !uniqueTextArray.includes(next.flavor_text)) {
        uniqueTextArray.push(next.flavor_text);
        return acc += next.flavor_text.replace(/\n|\f/g, " ");
      }
      return acc;
    }, "");
  }
  return "";
}

export const getCamleCaseString = (str: string = ""): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
