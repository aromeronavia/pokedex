import Pokedex from "./Pokedex.tsx";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { Pokemon, PokeAPIResponse } from "./types";

function usePokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>();

  useEffect(() => {
    async function fetchPokemons() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
      );
      const json: PokeAPIResponse = await response.json();

      setPokemons(json.results);
    }

    fetchPokemons();
  }, []);

  return pokemons;
}

function App() {
  const pokemons = usePokemons();
  console.log("Pokemons", pokemons);

  return (
    <div className="px-6 py-8 w-screen h-screen bg-white">
      <h1 className="text-3xl font-bold mb-5"> Pokedex </h1>
      <Pokedex pokemons={pokemons} />
    </div>
  );
}

export default App;
