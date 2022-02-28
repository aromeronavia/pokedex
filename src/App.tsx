import Pokedex from "./Pokedex.tsx";
import "./App.css";
import { useEffect, useReducer, useRef, useState } from "react";
import { Data, PokeAPIResponse } from "./types";
import { fetchPokemons, fetchPokemonDetail } from "./api.ts"
import { Card } from "./Card.tsx"

const DEFAULT_POKEMONS_STATE = {
  pokemons: [],
  count: 0,
  nextPage: "",
}

function dispatch(state: Data, data: Data) {
  return {
    pokemons: [...state.pokemons, ...data.pokemons],
    count: data.count,
    nextPage: data.nextPage
  }
}

function usePokemonsData() {
  const [data, setData] = useReducer(
    dispatch,
    DEFAULT_POKEMONS_STATE
  );
  const [searchedPokemon, setSearchedPokemon] = useState(null)

  const { nextPage } = data

  const fetchMorePokemons = () => {
    fetchPokemons(nextPage).then((json) => {
      setData({
        pokemons: json.results,
        count: json.count,
        nextPage: json.next,
      });
    });
  };

  return { data, setData, fetchMorePokemons, searchedPokemon, setSearchedPokemon }
}

function usePokemons() {
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

function Header({ count }) {
  return (
    <header>
      <h1 className="text-3xl font-bold mb-5"> Pokedex </h1>
      <p> Count: {count}</p>
    </header>
  )
}

function FetchButton({ fetchMorePokemons }) {
  return (
    <div className="flex justify-center">
      <button
        className="mt-5 text-center self-center bg-blue-800 rounded text-white p-2"
        onClick={fetchMorePokemons}
      >
        Next Page
      </button>
    </div>
  )
}

function Search({ onSearch, pokemon }) {
  const inputRef = useRef(null)

  return (
    <div className="mb-4">
      <input ref={inputRef} className="border border-black rounded" type="text" />
      <button className="border border-black rounded ml-4 px-2" onClick={() => onSearch(inputRef.current.value)}> Search! </button>
      {pokemon && (
        <>
          <p>Searched Pokemon: </p>
          <Card pokemon={pokemon} />
        </>
      )}
    </div>
  )
}

function App() {
  const {
    data: { pokemons, count },
    fetchMorePokemons,
    searchedPokemon,
    setSearchedPokemon,
  } = usePokemons();

  const fetchPokemon = (pokemonName: string) => {
    fetchPokemonDetail(pokemonName)
      .then(setSearchedPokemon)
  }

  return (
    <div className="px-6 py-8 w-screen h-screen bg-white">
      <Header count={count} />
      <Search onSearch={fetchPokemon} pokemon={searchedPokemon} />
      <Pokedex pokemons={pokemons} />
      <FetchButton fetchMorePokemons={fetchMorePokemons} />
    </div>
  );
}

export default App;
