import { PokemonDetailResponse, PokeAPIResponse } from "./types"

export async function fetchPokemonDetail(name: string) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );
  const rawPokemon: PokemonDetailResponse = await response.json();

  return rawPokemon
}

export async function fetchPokemons(pageUrl) {
  const response = await fetch(pageUrl);
  const json: PokeAPIResponse = await response.json();

  return json;
}
