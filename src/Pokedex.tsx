import { useEffect, useState } from "react";
import { Pokemon } from "./types";

type PokedexProps = {
  pokemons: Pokemon[];
};

type PokemonDetailResponse = {
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

type PokemonDetail = {
  name: string;
  types: string[];
};

function usePokemonDetail(pokemon: Pokemon) {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();

  useEffect(() => {
    async function fetchPokemonDetail() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const rawPokemon: PokemonDetailResponse = await response.json();

      setPokemonDetail({
        name: rawPokemon.name,
        types: rawPokemon.types.map((type) => type.type.name),
      });
    }

    fetchPokemonDetail();
  }, [pokemon]);

  return pokemonDetail;
}

function Card({ pokemon }: { pokemon: Pokemon }) {
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
          {pokemon.name || pokemonDetail.name}
        </p>
        {pokemonDetail?.types?.map((type) => (
          <p
            key={pokemonDetail.name}
            className="w-1/2 rounded-3xl px-2 text-center mb-3 bg-indigo-300"
          >
            {type}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function Pokedex(props: PokedexProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {props.pokemons?.map((pokemon) => (
        <Card pokemon={pokemon} />
      ))}
    </div>
  );
}
