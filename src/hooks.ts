import { useEffect, useState, useReducer } from "react";
import { Data, PokeAPIResponse } from "./types";

import { fetchPokemons } from "./api.ts"

const DEFAULT_POKEMONS_STATE = {
  pokemons: [],
  count: 0,
  nextPage: "",
};

function dispatch(state: Data, data: Data) {
  return {
    pokemons: [...state.pokemons, ...data.pokemons],
    count: data.count,
    nextPage: data.nextPage,
  };
}

function usePokemonsData() {
  const [data, setData] = useReducer(dispatch, DEFAULT_POKEMONS_STATE);
  const [searchedPokemon, setSearchedPokemon] = useState(null);

  const { nextPage } = data;

  const fetchMorePokemons = () => {
    fetchPokemons(nextPage).then((json) => {
      setData({
        pokemons: json.results,
        count: json.count,
        nextPage: json.next,
      });
    });
  };

  return {
    data,
    setData,
    fetchMorePokemons,
    searchedPokemon,
    setSearchedPokemon,
  };
}

export function usePokemons() {
  const { data, setData, fetchMorePokemons, searchedPokemon, setSearchedPokemon } = usePokemonsData()

  useEffect(() => {
    const FIRST_PAGE = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

    fetchPokemons(FIRST_PAGE).then((json: PokeAPIResponse) => {
      setData({
        pokemons: json.results,
        count: json.count,
        nextPage: json.next
      });
    });
  }, [setData]);

  return { data, fetchMorePokemons, searchedPokemon, setSearchedPokemon };
}
