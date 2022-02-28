import { Pokemon, PokemonDetail } from "./types";
import { useEffect, useState } from "react";
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
