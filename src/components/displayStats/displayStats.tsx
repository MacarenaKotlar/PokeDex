import { ConfigProvider, Form, Input, InputNumber } from "antd";
import { customAnt } from "../../helpers/customAnt";
import { IPokemon } from "../../mock";

const inputNumberWidth = "50%";

interface IDisplayStatProps {
  stat: any;
  unit: string;
  statName: string;
  pokemon?: IPokemon;
  name: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  value: any;
}

export function DisplayStat({
  stat,
  unit,
  statName,
  pokemon,
  name,
  onChange,
  value,
}: IDisplayStatProps) {
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
              <Form.Item
                name={name}
                style={{
                  width: "100%",
                  margin: "0",
                }}
                rules={[{ required: true, message: "Ingrese el nombre" }]}
              >
                <Input
                  showCount
                  maxLength={20}
                  defaultValue={stat}
                  placeholder={statName}
                  onChange={onChange}
                  value={value}
                />
              </Form.Item>
            ) : (
              <>
                <span>{statName}:</span>
                <Form.Item
                  name={name}
                  style={{ width: inputNumberWidth, margin: "0" }}
                >
                  <InputNumber
                    min={1}
                    defaultValue={stat}
                    placeholder={statName}
                    style={{ width: "100%" }}
                    onChange={onChange}
                    value={value}
                  />
                </Form.Item>
              </>
            )}
          </ConfigProvider>
        </>
      ) : location.pathname.includes("creation") ? (
        <>
          <ConfigProvider theme={customAnt}>
            {statName === "Nombre del Pokémon" ? (
              <Form.Item
                name={name}
                className="form-item"
                style={{ width: "100%", margin: "0" }}
                rules={[
                  { required: true, message: "Ingrese el nombre del Pokémon" },
                ]}
              >
                <Input
                  showCount
                  maxLength={20}
                  placeholder={statName}
                  onChange={onChange}
                  value={value}
                />
              </Form.Item>
            ) : (
              <>
                <span>{statName}:</span>
                <Form.Item
                  name={name}
                  className="form-item"
                  style={{ width: inputNumberWidth, margin: "0" }}
                >
                  <InputNumber
                    min={1}
                    defaultValue={1}
                    placeholder={statName}
                    style={{ width: "100%" }}
                    onChange={onChange}
                    value={value}
                  />
                </Form.Item>
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
