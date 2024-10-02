import {
  ArrowRightOutlined,
  EditOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { ConfigProvider, Flex, Image, Select, Upload } from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { customAnt } from "../../helpers/customAnt";
import { typesOptions } from "../../helpers/selectOptionsTypes";
import { IPokemon, listaPokemones } from "../../mock";
import { DisplayStat } from "../displayStats/displayStats";
import { TagRender } from "../tagRender/tagRender";
import ColorTags from "../type tags/tags";
import styles from "./index.module.scss";
import { SelectEvolutions } from "../selectEvolutions/selectEvolutions";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IAlertTexts {
  titleText: string;
  buttonText: string;
  successText: string;
}

interface IDetailsCard {
  pokemon?: IPokemon;
}

export function DetailsCard({ pokemon }: IDetailsCard) {
  const [favorite, setFavorite] = useState(false);
  const location = useLocation();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const star = favorite ? <StarFilled /> : <StarOutlined />;

  const handleClick = () => {
    setFavorite(!favorite);
  };

  const editBtnsClick = ({
    titleText,
    buttonText,
    successText,
  }: IAlertTexts) => {
    Swal.fire({
      title: titleText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: buttonText,
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: successText,
          icon: "success",
        });
      }
    });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div
          className={styles.pokemonImage}
          style={{ backgroundImage: `url(${pokemon?.img})` }}
        >
          {(location.pathname.includes("edit") ||
            location.pathname.includes("creation")) && (
            <Flex
              flex={1}
              style={{ width: "100%", height: "100%" }}
              justify="center"
              align="center"
            >
              <Upload
                style={{ width: "100%", height: "100%" }}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : (
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Flex>
          )}
        </div>
        <div className={styles.pokemonDetails}>
          <div className={styles.pokemonDetails_header}>
            <div className={styles.pokemonDetails_title}>
              <h3>{pokemon?.id}</h3>
              <DisplayStat
                pokemon={pokemon}
                stat={pokemon?.name}
                statName="Nombre del Pokémon"
                unit=""
              />
            </div>
            <div className={styles.pokemonDetails_buttons}>
              {location.pathname.includes("detail") && (
                <>
                  <a
                    className={
                      favorite
                        ? `${styles.pokemonDetails_buttons_favoriteBtn} ${styles.favorite}`
                        : styles.pokemonDetails_buttons_favoriteBtn
                    }
                    onClick={handleClick}
                  >
                    {star}
                  </a>
                  <Link
                    to={`/edit/${pokemon?.id}`}
                    className={styles.pokemonDetails_buttons_editBtn}
                  >
                    <EditOutlined />
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className={styles.pokemonDetails_details}>
            <div className={styles.pokemonDetails_details_traits}>
              <div className={styles.pokemonDetails_details_traits_item}>
                <span>Tipo:</span>
                <aside>
                  {location.pathname.includes("detail")
                    ? pokemon?.types?.map((type) => {
                        const spanBackground = ColorTags(type);
                        return (
                          <span
                            style={{
                              padding: "0 1vw",
                              borderRadius: "0.5vw",
                              color: "white",
                              backgroundColor: spanBackground,
                            }}
                          >
                            {type}
                          </span>
                        );
                      })
                    : (location.pathname.includes("edit") ||
                        location.pathname.includes("creation")) && (
                        <ConfigProvider theme={customAnt}>
                          <Select
                            mode="multiple"
                            tagRender={TagRender}
                            style={{ width: "100%" }}
                            options={typesOptions}
                            placeholder="Seleccione los Tipos"
                            maxCount={2}
                            defaultValue={pokemon?.types?.map((type) => {
                              return type;
                            })}
                          />
                        </ConfigProvider>
                      )}
                </aside>
              </div>

              <div className={styles.pokemonDetails_details_traits_item}>
                <DisplayStat
                  pokemon={pokemon}
                  stat={
                    pokemon &&
                    pokemon.height &&
                    location.pathname.includes("detail")
                      ? pokemon.height / 10
                      : pokemon?.height
                  }
                  statName="Altura"
                  unit="m"
                />
              </div>
              <div className={styles.pokemonDetails_details_traits_item}>
                <DisplayStat
                  pokemon={pokemon}
                  stat={
                    pokemon &&
                    pokemon.weigth &&
                    location.pathname.includes("detail")
                      ? pokemon.weigth / 10
                      : pokemon?.weigth
                  }
                  statName="Peso"
                  unit="Kg"
                />
              </div>
              <div className={styles.pokemonDetails_details_traits_item}>
                <DisplayStat
                  pokemon={pokemon}
                  stat={pokemon?.experience}
                  statName="Experiencia"
                  unit="xp"
                />
              </div>
            </div>
            <div className={styles.pokemonDetails_details_stats}>
              <div className={styles.pokemonDetails_details_traits_item}>
                <DisplayStat
                  pokemon={pokemon}
                  stat={pokemon?.health}
                  statName="Salud"
                  unit=""
                />
              </div>
              <div className={styles.pokemonDetails_details_traits_item}>
                <DisplayStat
                  pokemon={pokemon}
                  stat={pokemon?.attack}
                  statName="Ataque"
                  unit=""
                />
              </div>
              <div className={styles.pokemonDetails_details_traits_item}>
                <DisplayStat
                  pokemon={pokemon}
                  stat={pokemon?.defence}
                  statName="Defensa"
                  unit=""
                />
              </div>
              <div className={styles.pokemonDetails_details_traits_item}>
                <DisplayStat
                  pokemon={pokemon}
                  stat={pokemon?.speed}
                  statName="Velocidad"
                  unit=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.pokemonEvolutions}>
          {location.pathname.includes("detail")
            ? pokemon?.evolutions?.map((evolution) => {
                const flecha =
                  pokemon?.evolutions.indexOf(evolution) == 0 ? (
                    ""
                  ) : (
                    <ArrowRightOutlined />
                  );

                const evolutionID = listaPokemones.find(
                  (p) => p.name === evolution.name
                )?.id;

                const sendToEvolution = `/detail/${evolutionID}`;

                return (
                  <>
                    {flecha}
                    <Link to={sendToEvolution} onClick={window.location.reload}>
                      <img src={evolution.img} alt={evolution.name} />
                    </Link>
                  </>
                );
              })
            : location.pathname.includes("edit")
            ? pokemon?.evolutions?.map((evolution) => {
                const flecha = pokemon?.evolutions.indexOf(evolution) != 0 && (
                  <ArrowRightOutlined />
                );
                return (
                  <>
                    {flecha}
                    {SelectEvolutions(evolution.name)}
                  </>
                );
              })
            : (() => {
                const createdEvolutions = [];
                for (let i = 0; i < 3; i++) {
                  i != 0 && createdEvolutions.push(<ArrowRightOutlined />);
                  createdEvolutions.push(SelectEvolutions(""));
                }
                return <>{createdEvolutions}</>;
              })()}
        </div>
      </div>
      {(location.pathname.includes("edit") ||
        location.pathname.includes("creation")) && (
        <div className={styles.editButtons}>
          <Link
            to=""
            className={styles.editButtons_edit}
            onClick={() =>
              editBtnsClick({
                titleText: location.pathname.includes("edit")
                  ? "¿Desea guardar los cambios?"
                  : "¿Desea crear este Pokémon?",
                buttonText: location.pathname.includes("edit")
                  ? "Guardar"
                  : "Crear",
                successText: location.pathname.includes("edit")
                  ? "Cambios guardados"
                  : "Se creó el Pokémon",
              })
            }
          >
            {location.pathname.includes("edit") ? "Editar" : "Crear"}
          </Link>
          <a
            className={styles.editButtons_delete}
            onClick={() => {
              location.pathname.includes("edit")
                ? editBtnsClick({
                    titleText: "¿Desea eliminar este Pokémon?",
                    buttonText: "Eliminar",
                    successText: "Se eliminó el Pokémon",
                  })
                : window.location.reload();
            }}
          >
            {location.pathname.includes("edit") ? "Eliminar" : "Limpiar Campos"}
          </a>
        </div>
      )}
    </div>
  );
}
