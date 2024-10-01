import { ConfigProvider, Input, InputNumber } from "antd";
import { customAnt } from "../../helpers/customAnt";
import { IPokemon } from "../../mock";
import { useEffect } from "react";

const inputNumberWidth = "50%";

interface IDisplayStatProps {
  stat: any;
  unit: string;
  statName: string;
  pokemon?: IPokemon;
}

export function DisplayStat({
  stat,
  unit,
  statName,
  pokemon,
}: IDisplayStatProps) {
  useEffect(() => {
    console.log(pokemon);
  }, [pokemon]);
  return (
    <>
      {location.pathname.includes("detail") ? (
        stat === pokemon?.name ? (
          <h3>{stat}</h3>
        ) : (
          <>
            <span>{statName}:</span>
            <span>
              {stat} {unit}
            </span>
          </>
        )
      ) : location.pathname.includes("edit") ? (
        <>
          <ConfigProvider theme={customAnt}>
            {stat === pokemon?.name ? (
              <Input
                showCount
                maxLength={20}
                defaultValue={stat}
                placeholder={statName}
              />
            ) : (
              <>
                <span>{statName}:</span>
                <InputNumber
                  min={1}
                  defaultValue={stat}
                  placeholder={statName}
                  style={{ width: inputNumberWidth }}
                />
              </>
            )}
          </ConfigProvider>
        </>
      ) : location.pathname.includes("creation") ? (
        <>
          <ConfigProvider theme={customAnt}>
            {statName === "Nombre del Pokémon" ? (
              <Input showCount maxLength={20} placeholder={statName} />
            ) : (
              <>
                <span>{statName}:</span>
                <InputNumber
                  min={1}
                  defaultValue={1}
                  placeholder={statName}
                  style={{ width: inputNumberWidth }}
                />
              </>
            )}
          </ConfigProvider>
        </>
      ) : (
        ""
      )}
    </>
  );
}
