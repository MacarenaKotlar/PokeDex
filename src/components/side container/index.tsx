import type { SelectProps } from "antd";
import { Select } from "antd";
import { ConfigProvider } from "antd";
import styles from "./index.module.scss";
import { useFilters } from "../../hooks/useFilters";
import { PokemonUseCases } from "../../useCases/pokemonsUseCases";
import { useEffect, useState } from "react";
import { TagRender } from "../tagRender/tagRender";
import { IPokemon, IType } from "../../mock";

interface ISideContainer {
  page: number;
  limit: number;
}

export function SideContainer({ page, limit }: ISideContainer) {
  const { filters, setFilters } = useFilters();
  const [types, setTypes] = useState<SelectProps["options"]>([]);
  const [pokemonOptions, setPokemonOptions] = useState<SelectProps["options"]>(
    []
  );

  const handleSearch = (value: string) => {
    if (value) {
      setFilters((prevstate: any) => ({
        ...prevstate,
        search: value,
      }));
    } else {
      setFilters((prevstate: any) => ({
        ...prevstate,
        search: "",
      }));
    }
  };

  const handleSortChange = (value: string) => {
    setFilters((prevstate: any) => ({
      ...prevstate,
      sort: value,
    }));
  };

  const handleExistenceFilterChange = (value: string) => {
    setFilters((prevstate: any) => ({
      ...prevstate,
      existence: value,
    }));
  };

  const handleTypesFilterChange = (value: string[]) => {
    setFilters((prevstate: any) => ({
      ...prevstate,
      types: value,
    }));
  };

  function firstLetterToUpperCase(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const getPokemons = async () => {
      const pokemons = await PokemonUseCases.filterPokemons(
        page,
        limit,
        filters
      );
      const mapedPokemons = pokemons.map((pokemon: IPokemon) => ({
        value: pokemon.name,
        label: firstLetterToUpperCase(pokemon.name),
      }));
      setPokemonOptions(mapedPokemons);
    };
    getPokemons();
  }, [page, filters]);

  useEffect(() => {
    const getTypes = async () => {
      const types = await PokemonUseCases.getTypes();
      const mapedTypes = types.map((type: IType) => ({
        value: type.name,
        label: firstLetterToUpperCase(type.name),
      }));
      setTypes(mapedTypes);
    };
    getTypes();
  }, []);

  const orderBySelectOptions = [
    { value: "byID", label: "Por Defecto" },
    { value: "a-z", label: "De la A a la Z" },
    { value: "z-a", label: "De la Z a la A" },
    { value: "byAttack", label: "Por Ataque" },
  ];

  const filterSelectOptions = [
    { value: "all", label: "Por Defecto" },
    { value: "api", label: "Pokemones Existentes" },
    { value: "local", label: "Creados por el Usuario" },
  ];

  const customSelect = {
    components: {
      Select: {
        colorBorder: "rgba(255,217,0,0.3)",
        selectorBg: "rgba(255,255,255,0)",
        fontSize: 15,
        colorText: "rgb(255,255,255)",
        colorBgElevated: "rgb(65,65,65)",
        optionActiveBg: "rgba(255,255,255,0.1)",
        optionSelectedBg: "rgba(10,53,194,0.5)",
        colorTextPlaceholder: "rgba(255,255,255,0.25)",
        colorPrimaryHover: "rgb(248,217,107)",
        colorPrimary: "rgb(255,219,90)",
        colorTextQuaternary: "rgba(255,255,255,0.4)",
        colorBgBase: "rgb(140,140,140)",
      },
    },
  };

  return (
    <ConfigProvider theme={customSelect}>
      <div className={styles.sideContainer}>
        <ul>
          <li>
            <span>Buscar</span>
            <Select
              style={{ width: "100%" }}
              showSearch
              placeholder="Seleccione un Pokémon"
              options={pokemonOptions}
              onSearch={handleSearch}
              onChange={handleSearch}
              allowClear
            />
          </li>

          <li>
            <span>Ordenar</span>
            <Select
              style={{ width: "100%" }}
              options={orderBySelectOptions}
              onChange={handleSortChange}
              value={filters.sort}
            />
          </li>

          <li>
            <span>Filtrar por Tipo</span>
            <Select
              mode="multiple"
              tagRender={TagRender}
              style={{ width: "100%" }}
              options={types}
              placeholder="Seleccione los Tipos"
              onChange={handleTypesFilterChange}
              value={filters.types}
            />
          </li>

          <li>
            <span>Filtrar por Existencia</span>
            <Select
              style={{ width: "100%" }}
              options={filterSelectOptions}
              onChange={handleExistenceFilterChange}
              value={filters.existence}
            />
          </li>
        </ul>
      </div>
    </ConfigProvider>
  );
}
