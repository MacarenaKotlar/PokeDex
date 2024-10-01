import { useParams } from "react-router-dom";
import { DetailsCard } from "../../components/details card";
import { useEffect, useState } from "react";
import { IPokemon, listaPokemones } from "../../mock";

function Edit() {
  const [pokemon, setPokemon] = useState<IPokemon>();

  const { id } = useParams();

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = () => {
    if (id) {
      const fetch = listaPokemones.find(
        (findPokemon) => parseInt(id) === findPokemon.id
      );
      setPokemon(fetch);
    }
  };

  return (
    <>
      {pokemon && (
        <main className="mainCenter">
          <DetailsCard pokemon={pokemon} />
        </main>
      )}
    </>
  );
}

export default Edit;
