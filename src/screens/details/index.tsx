import { useParams } from "react-router-dom";
import { DetailsCard } from "../../components/details card";
import { useEffect, useState } from "react";
import { IPokemon } from "../../mock";
import { GlobalStateService } from "../../services/globalStateService";
import { PokemonUseCases } from "../../useCases/pokemonsUseCases";

function Details() {
  const [pokemon, setPokemon] = useState<IPokemon>();

  const { id } = useParams();

  const pokemones = GlobalStateService.getPokemons();

  const getPokemon = async () => {
    await PokemonUseCases.getPokemons();
    if (id) {
      const fetch = pokemones.find(
        (findPokemon) => parseInt(id) === findPokemon.id
      );
      setPokemon(fetch);
    }
  };

  useEffect(() => {
    getPokemon();
  }, [id]);

  return (
    <>
      {console.log(pokemon)}
      {pokemon && (
        <main className="mainCenter">
          <DetailsCard key={pokemon.id} pokemon={pokemon} />
        </main>
      )}
    </>
  );
}

export default Details;
