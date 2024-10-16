import { DetailsCard } from "../../components/details card";
import { IPokemon, listaPokemones } from "../../mock";

const emptyPokemon: IPokemon = {
  id: listaPokemones.length + 1,
  name: "",
  types: [],
  height: 0,
  weight: 0,
  experience: 0,
  health: 0,
  attack: 0,
  defense: 0,
  speed: 0,
  img: "",
  source: "",
  evolutions: [],
};

function Creation() {
  return (
    <>
      <main className="mainCenter">
        <DetailsCard key={emptyPokemon.id} pokemon={emptyPokemon} />
      </main>
    </>
  );
}

export default Creation;
