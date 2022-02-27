import Pokedex from "./Pokedex.tsx";
import "./App.css";
import { useState, useEffect, useReducer, useCallback } from "react";
import { Pokemon, PokeAPIResponse } from "./types";

interface Data {
  pokemons: Pokemon[];
  count: number;
  nextPage: string;
}

async function fetchPokemons(pageUrl) {
  const response = await fetch(pageUrl);
  const json: PokeAPIResponse = await response.json();

  return json;
}

function usePokemons() {
  const [data, setData] = useReducer(
    (state: Data, data: Data) => ({
      pokemons: [...state.pokemons, ...data.pokemons],
      count: data.count,
      nextPage: data.nextPage
    }),
    {
      pokemons: [],
      count: 0,
      nextPage: "",
    }
  );
  const { nextPage } = data;

  useEffect(() => {
    const FIRST_PAGE = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

    fetchPokemons(FIRST_PAGE).then((json) => {
      setData({
        pokemons: json.results,
        count: json.count,
        nextPage: json.next
      });
    });
  }, []);

  const fetchMorePokemons = () => {
    fetchPokemons(nextPage).then((json) => {
      setData({
        pokemons: json.results,
        count: json.count,
        nextPage: json.next
      });
    });
  };

  return { data, fetchMorePokemons };
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
  console.log("Rendered button")
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

function App() {
  const {
    data: { pokemons, count },
    fetchMorePokemons,
  } = usePokemons();

  return (
    <div className="px-6 py-8 w-screen h-screen bg-white">
      <Header count={count} />
      <Pokedex pokemons={pokemons} />
      <FetchButton fetchMorePokemons={fetchMorePokemons} />
    </div>
  );
}

export default App;
