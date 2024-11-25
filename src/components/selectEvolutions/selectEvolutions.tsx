import { useEffect, useState } from "react";
import { IPokemon } from "../../mock";
import { useLocation } from "react-router-dom";
import { ConfigProvider, Select, SelectProps } from "antd";
import { customAnt } from "../../helpers/customAnt";
import { JSONAPIService } from "../../services/api/JSONAPIService";

export function SelectEvolutions(defaultEvolution: string) {
  const [pokemonOptions, setPokemonOptions] = useState<SelectProps["options"]>(
    []
  );
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const location = useLocation();

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    const fetch = await JSONAPIService.getLocalPokemons();
    setPokemons(fetch);
  };

  useEffect(() => {
    if (pokemons.length > 0) {
      const mapedPokemons = pokemons.map((pokemon) => ({
        value: pokemon.id,
        label: pokemon.name,
      }));
      setPokemonOptions(mapedPokemons);
    }
  }, []);

  const DisplaySelect = () => {
    return (
      <ConfigProvider theme={customAnt}>
        <Select
          style={{ width: "10vw" }}
          options={pokemonOptions}
          placeholder="Seleccione el Pokémon"
          {...(location.pathname.includes("edit") && {
            defaultValue: defaultEvolution,
          })}
          allowClear
        />
      </ConfigProvider>
    );
  };

  return DisplaySelect();
}
