import type { SelectProps } from "antd";
import { Select, Tag } from "antd";
import { ConfigProvider } from "antd";
import styles from "./index.module.scss";
import ColorTags from "../type tags/tags";
import { useFilters } from "../../hooks/useFilters";

export function SideContainer() {
  const { filters, setFilters } = useFilters();

  const hanldeExistenceFilterChange = (value: string) => {
    setFilters((prevstate: any) => ({
      ...prevstate,
      existence: value,
    }));
  };
  type TagRender = SelectProps["tagRender"];

  const options: SelectProps["options"] = [
    {
      label: "Planta",
      value: "grass",
    },
    {
      label: "Veneno",
      value: "poison",
    },
    {
      label: "Fuego",
      value: "fire",
    },
    {
      label: "Volador",
      value: "flying",
    },
    {
      label: "Agua",
      value: "water",
    },
    {
      label: "Eléctrico",
      value: "electric",
    },
    {
      label: "Psíquico",
      value: "psychic",
    },
  ];

  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={ColorTags(value)}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

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
              tagRender={tagRender}
              style={{ width: "100%" }}
              options={options}
              placeholder="Seleccione los Tipos"
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
