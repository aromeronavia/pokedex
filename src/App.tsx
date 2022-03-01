import { fetchPokemonDetail } from "./api.ts"
import { usePokemons } from "./hooks.ts"
import { Header, Search, FetchButton, Pokedex } from "./components.tsx"

import "./App.css";

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
