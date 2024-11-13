import type { SelectProps } from "antd";
import { Select } from "antd";
import { ConfigProvider } from "antd";
import styles from "./index.module.scss";
import { useFilters } from "../../hooks/useFilters";
import { PokemonUseCases } from "../../useCases/pokemonsUseCases";
import { useEffect, useState } from "react";
import { TagRender } from "../tagRender/tagRender";

interface IType {
  name: string;
  url: string;
}

export function SideContainer() {
  const { filters, setFilters } = useFilters();
  const [types, setTypes] = useState<SelectProps["options"]>([]);

  const hanldeExistenceFilterChange = (value: string) => {
    setFilters((prevstate: any) => ({
      ...prevstate,
      existence: value,
    }));
  };

  const hanldeTypesFilterChange = (value: string[]) => {
    setFilters((prevstate: any) => ({
      ...prevstate,
      types: value,
    }));
  };

  function firstLetterToUpperCase(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const getTypes = async () => {
      const types = await PokemonUseCases.getTypes();
      const mapedTypes = types.map((type: IType) => ({
        value: type.name,
        label: firstLetterToUpperCase(type.name),
      }));
      setTypes(mapedTypes);
      console.log(mapedTypes);
    };
    getTypes();
  }, []);

  const orderBySelectOptions = [
    { value: "Por Defecto", label: "Por Defecto" },
    { value: "De la A a la Z", label: "De la A a la Z" },
    { value: "De la Z a la A", label: "De la Z a la A" },
    { value: "Por Ataque", label: "Por Ataque" },
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
      },
    },
  };

  return (
    <ConfigProvider theme={customSelect}>
      <div className={styles.sideContainer}>
        <ul>
          <li>
            <span>Ordenar</span>
            <Select
              style={{ width: "100%" }}
              defaultValue="Por Defecto"
              options={orderBySelectOptions}
            ></Select>
          </li>

          <li>
            <span>Filtrar por Tipo</span>
            <Select
              mode="multiple"
              tagRender={TagRender}
              style={{ width: "100%" }}
              options={types}
              placeholder="Seleccione los Tipos"
              onChange={hanldeTypesFilterChange}
              value={filters.types}
            />
          </li>

          <li>
            <span>Filtrar por Existencia</span>
            <Select
              style={{ width: "100%" }}
              options={filterSelectOptions}
              onChange={hanldeExistenceFilterChange}
              value={filters.existence}
            ></Select>
          </li>
        </ul>
      </div>
    </ConfigProvider>
  );
}
