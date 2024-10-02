import { useEffect, useState } from "react";
import { Card } from "../../components/card";
import { SideContainer } from "../../components/side container";
import { IPokemon, listaPokemones } from "../../mock";
import { PokemonUseCases } from "../../useCases/pokemonsUseCases";
import { GlobalStateService } from "../../services/globalStateService";

function Home() {
  useEffect(() => {
    getPokemones();
  }, []);

  const pokemones = GlobalStateService.getPokemons();

  const getPokemones = async () => {
    await PokemonUseCases.getPokemons();
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
