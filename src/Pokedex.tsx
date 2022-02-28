import { PokedexProps } from "./types";
import { Card } from "./Card.tsx";

export default function Pokedex(props: PokedexProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {props.pokemons?.map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
