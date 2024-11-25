import { useEffect, useState } from "react";
import { Card } from "../../components/card";
import { SideContainer } from "../../components/side container";
import { PokemonUseCases } from "../../useCases/pokemonsUseCases";
import { GlobalStateService } from "../../services/globalStateService";
import { ConfigProvider, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useFilters } from "../../hooks/useFilters";
import { IFilters } from "../../context/filters";

function Favorites() {
  const pageInitialValue = 1;
  const pageSizeLimitInitialValue = 20;
  const [page, setPage] = useState(pageInitialValue);
  const [pageSize, setPageSize] = useState(pageSizeLimitInitialValue);
  const [limit, setLimit] = useState(pageSizeLimitInitialValue);
  const [favoritesUpdated, setFavoritesUpdated] = useState(false);
  const { filters } = useFilters();

  const handlePageChange = () => {
    setPage(page + 1);
    setLimit(limit + pageSize);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  const pokemons = GlobalStateService.getPokemons();

  const handleFavoritesChange = () => {
    setFavoritesUpdated((prev) => !prev);
  };

  const getPokemons = async (
    page: number,
    limit: number,
    filters: IFilters
  ) => {
    await PokemonUseCases.getFavorites(page, limit, filters);
  };

  useEffect(() => {
    setPageSize(pageSizeLimitInitialValue);
    setLimit(pageSizeLimitInitialValue);
    setPage(pageInitialValue);
    getPokemons(pageInitialValue, pageSizeLimitInitialValue, filters);
  }, [filters.sort, filters.types, filters.existence]);

  useEffect(() => {
    console.log(favoritesUpdated);
    getPokemons(page, limit, filters);
  }, [page, filters.search, favoritesUpdated]);

  const customPagination = {
    components: {
      Select: {
        colorBorder: "rgba(255,217,0,0.5)",
        selectorBg: "rgba(60,60,60)",
        fontSize: 16,
        controlHeight: 40,
        colorText: "rgb(255,255,255)",
        colorBgElevated: "rgb(65,65,65)",
        optionActiveBg: "rgba(255,255,255,0.1)",
        optionSelectedBg: "rgba(10,53,194,0.5)",
        colorTextPlaceholder: "rgba(255,255,255,0.25)",
        colorPrimaryHover: "rgb(212,194,90)",
        colorPrimary: "rgb(255,219,90)",
        colorTextQuaternary: "rgba(255,255,255,0.4)",
      },
    },
  };

  const pageSizeOptions = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
  ];

  return (
    <>
      <main className="mainSpaceBetween">
        <SideContainer page={page} limit={limit} />
        <div className="homeContainer">
          <div className="cardsContainer">
            {pokemons.map((pokemon) => (
              <Card
                key={pokemon.id}
                id={pokemon.id}
                attackPoints={pokemon.attack}
                image={pokemon.img}
                name={pokemon.name}
                source={pokemon.source}
                pokemon={pokemon}
                onFavoritesChange={handleFavoritesChange}
              ></Card>
            ))}
          </div>
          <div className="paginationContainer">
            <button onClick={handlePageChange}>
              Mostrar más <DownOutlined />
            </button>
            <div>
              <ConfigProvider theme={customPagination}>
                <Select
                  options={pageSizeOptions}
                  value={pageSize}
                  onChange={handlePageSizeChange}
                />
                <span>Pokemones por página</span>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Favorites;
