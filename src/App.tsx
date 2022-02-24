import Pokedex from "./Pokedex.tsx";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { Pokemon, PokeAPIResponse } from "./types";

async function fetchPokemons(pageUrl) {
  const response = await fetch(pageUrl);
  const json: PokeAPIResponse = await response.json();

  return json;
}

function usePokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [count, setCount] = useState<number>();
  const [nextPage, setNextPage] = useState<string>();

  useEffect(() => {
    const FIRST_PAGE = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

    async function getPokemons(pageUrl) {
      const json = await fetchPokemons(pageUrl);

      updateState(json);
    }

    getPokemons(FIRST_PAGE);
  }, []);

  const fetchMorePokemons = async () => {
    const json = await fetchPokemons(nextPage);
    updateState(json);
  };

  const updateState = (json) => {
    setPokemons((pokemons) => pokemons.concat(json.results));
    setCount(json.count);
    setNextPage(json.next);
  };

  return { pokemons, count, nextPage, fetchMorePokemons };
}

function App() {
  const { pokemons, count, nextPage, fetchMorePokemons } = usePokemons();
  console.log(pokemons);
  console.log(count);
  console.log(nextPage);

  return (
    <div className="px-6 py-8 w-screen h-screen bg-white">
      <header>
        <h1 className="text-3xl font-bold mb-5"> Pokedex </h1>
      </header>
      <Pokedex pokemons={pokemons} />
      <div className="flex justify-center">
        <button
          className="mt-5 text-center self-center bg-blue-800 rounded text-white p-2"
          onClick={fetchMorePokemons}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;
