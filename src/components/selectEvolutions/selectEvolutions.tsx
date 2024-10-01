import { useEffect, useState } from "react";
import { IPokemon, listaPokemones } from "../../mock";
import { useLocation } from "react-router-dom";
import { ConfigProvider, Select } from "antd";
import { customAnt } from "../../helpers/customAnt";

interface IPokemonOption {
  value?: number;
  label?: string;
}

export function SelectEvolutions(defaultEvolution: string) {
  const [pokemonOptions, setPokemonOptions] = useState<IPokemonOption[]>([]);
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);
  const location = useLocation();

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = () => {
    const fetch = [...listaPokemones];
    setPokemon(fetch);
  };

  useEffect(() => {
    pokemon.length > 0 &&
      setPokemonOptions(
        pokemon.map((p) => ({
          value: p.id,
          label: p.name,
        }))
      );
  }, [pokemon]);

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
