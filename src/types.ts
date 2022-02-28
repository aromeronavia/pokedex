export type PokemonDetailResponse = {
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

export type PokeAPIResponse = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};

export type Pokemon = {
  name: string;
  url: string;
};

export type Data = {
  pokemons: Pokemon[];
  count: number;
  nextPage: string;
}

export type PokedexProps = {
  pokemons: Pokemon[];
};

export type PokemonDetail = {
  name: string;
  types: string[];
};
