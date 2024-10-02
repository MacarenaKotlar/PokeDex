import { useEffect, useState } from "react";
import { Card } from "../../components/card";
import { SideContainer } from "../../components/side container";
import { IPokemon, listaPokemones } from "../../mock";

function Home() {
  const [pokemones, setPokemones] = useState<IPokemon[]>([]);
  useEffect(() => {
    getPokemones();
  }, []);

  const getPokemones = () => {
    const fetchList = [...listaPokemones, ...listaPokemones];
    setPokemones(fetchList);
  };

  return (
    <>
      <main className="mainSpaceBetween">
        <SideContainer />
        <div className="cardsContainer">
          {pokemones.map((pokemon) => (
            <Card
              id={pokemon.id}
              attackPoints={pokemon.attack}
              image={pokemon.img}
              name={pokemon.name}
            ></Card>
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;
