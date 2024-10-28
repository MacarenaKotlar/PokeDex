import { useParams } from "react-router-dom";
import { DetailsCard } from "../../components/details card";
import { useEffect, useState } from "react";
import { IPokemon } from "../../mock";
import { PokemonUseCases } from "../../useCases/pokemonsUseCases";

function Edit() {
  const [pokemon, setPokemon] = useState<IPokemon>();

  const { source } = useParams();
  const { id } = useParams();

  const getPokemon = async () => {
    const fetchedPokemon = await PokemonUseCases.getPokemon(source, id);
    setPokemon(fetchedPokemon);
  };

  useEffect(() => {
    getPokemon();
  }, [id]);

  return (
    <>
      {pokemon && (
        <main className="mainCenter">
          <DetailsCard key={pokemon.id} pokemon={pokemon} />
        </main>
      )}
    </>
  );
}

export default Edit;
