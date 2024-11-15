import { useParams } from "react-router-dom";
import { DetailsCard } from "../../components/details card";
import { useEffect, useState } from "react";
import { IPokemon } from "../../mock";
import { PokemonUseCases } from "../../useCases/pokemonsUseCases";
import { Loader } from "../../components/loader";

function Edit() {
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [loading, setLoading] = useState(true);

  const { source } = useParams();
  const { id } = useParams();

  const getPokemon = async () => {
    const fetchedPokemon = await PokemonUseCases.getPokemon(source, id);
    setPokemon(fetchedPokemon);
  };

  useEffect(() => {
    setLoading(true);
    getPokemon().then(() => {
      setTimeout(() => setLoading(false), 1000);
    });
  }, [id]);

  return (
    <>
      <main className="mainCenter">
        {loading ? (
          <Loader />
        ) : (
          pokemon && <DetailsCard key={pokemon.id} pokemon={pokemon} />
        )}
      </main>
    </>
  );
}

export default Edit;
