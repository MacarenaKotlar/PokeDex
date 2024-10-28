import { useEffect, useState } from "react";
import { Card } from "../../components/card";
import { SideContainer } from "../../components/side container";
import { PokemonUseCases } from "../../useCases/pokemonsUseCases";
import { GlobalStateService } from "../../services/globalStateService";
import { ConfigProvider, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";

function Home() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const handlePageChange = () => {
    setPage(page + pageSize);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  const pokemones = GlobalStateService.getPokemons();

  const getPokemones = async () => {
    await PokemonUseCases.getPokemons(page, pageSize);
  };

  useEffect(() => {
    getPokemones();
  }, [page, pageSize]);

  const customPagination = {
    components: {
      Select: {
        colorBorder: "rgba(255,217,0,0.5)",
        selectorBg: "rgba(60,60,60)",
        fontSize: 16,
        controlHeight: 45,
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
        <SideContainer />
        <div className="homeContainer">
          <div className="cardsContainer">
            {pokemones.map((pokemon) => (
              <Card
                key={pokemon.id}
                id={pokemon.id}
                attackPoints={pokemon.attack}
                image={pokemon.img}
                name={pokemon.name}
                source={pokemon.source}
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
                  defaultValue={pageSize}
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

export default Home;
