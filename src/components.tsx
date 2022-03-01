import { useEffect, useRef, useState } from "react";

import { Pokemon, PokemonDetail, PokedexProps } from "./types";
import { fetchPokemonDetail } from "./api.ts"

function usePokemonDetail(pokemon: Pokemon) {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();

  useEffect(() => {
    if (!pokemon) {
      return
    }

    fetchPokemonDetail(pokemon.name)
      .then((rawPokemon) => {
        setPokemonDetail({
          name: rawPokemon.name,
          types: rawPokemon.types.map((type) => type.type.name),
        });
      })
  }, [pokemon])

  return pokemonDetail;
}

export function Card({ pokemon }: { pokemon: Pokemon; }) {
  const pokemonDetail = usePokemonDetail(pokemon);

  const colors = {
    grass: "green-100",
    fire: "red-100",
    normal: "gray-100",
  };
  const color = colors[pokemonDetail?.types?.[0]] || "green-100";

  return (
    <div className={`p-2 rounded-xl bg-${color} text-center`}>
      <div className="flex flex-col items-center">
        <p className="capitalize font-bold text-lg mb-1">
          {pokemon?.name ?? pokemonDetail?.name}
        </p>
        {pokemonDetail?.types?.map((type) => (
          <p
            key={type}
            className="w-1/2 rounded-3xl px-2 text-center mb-3 bg-indigo-300"
          >
            {type}
          </p>
        ))}
      </div>
    </div>
  );
}

export function Pokedex(props: PokedexProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {props.pokemons?.map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

export function Header({ count }) {
  return (
    <header>
      <h1 className="text-3xl font-bold mb-5"> Pokedex </h1>
      <p> Count: {count}</p>
    </header>
  )
}

export function Search({ onSearch, pokemon }) {
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

export function FetchButton({ fetchMorePokemons }) {
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