import { useState } from "react";
import styles from "./index.module.scss";
import { StarOutlined, StarFilled, EditOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
import { ConfigProvider, Flex, Input, InputNumber, Select, SelectProps, Tag } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import Swal from "sweetalert2";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IAlertTexts{
    titleText: string;
    buttonText: string;
    successText: string
}

interface ITypes{
    value: string;
    label: string;
}

interface IDetailsCard{
    id: number;
    name: string;
    image: string;
    types: ITypes[];
    height: number;
    weight: number;
    healthPoints: number;
    attackPoints: number;
    defensePoints: number;
    speedPoints: number;
    evolutions: string[];
}

export function DetailsCard({ id, name, image, types, height, weight, healthPoints, attackPoints, defensePoints, speedPoints, evolutions }: IDetailsCard){
    const [favorite, setFavorite] = useState(false);

    const star = favorite ? <StarFilled /> : <StarOutlined />
    
    const handleClick = () => {
        setFavorite(!favorite);
    }

    const editBtnsClick = ({ titleText, buttonText, successText }: IAlertTexts) => {
        Swal.fire({
            title: titleText,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: buttonText,
            cancelButtonText: "Cancelar",
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: successText,
                icon: "success"
              });
            }
          });
    }

    const location = useLocation();
    const detailsPath = '/details';
    const editPath = '/edit';

    type TagRender = SelectProps['tagRender'];

    const options: SelectProps['options'] = types;

    const tagRender: TagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginInlineEnd: 4 }}
            >
            {label}
            </Tag>
        );
    };

    const customAnt = {
        "components": {
          "Select": {
            "colorBorder": "rgba(100,100,100,0.5)",
            "fontSize": 15,
            "colorPrimaryHover": "rgb(0,0,0,0.5)",
            "colorPrimary": "rgb(0,0,0)"
          },
        "Input": {
            "activeBorderColor": "rgb(0,0,0)",
            "hoverBorderColor": "rgba(0,0,0,0.5)",
            "colorBorder": "rgba(100,100,100,0.5)",
            "inputFontSize": 15
            }
        }
      }
    
    const inputNumberWidth = '50%';

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
      ]);
    
      const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as FileType);
        }
    
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
      };
    
      const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    
      const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      );

    return(
        <div className={styles.container}>
            <div className={styles.detailsContainer}>
                <div className={styles.pokemonImage} style={{backgroundImage: `url(${image})`}}>
                {
                    location.pathname === editPath
                        ?
                            <Flex flex={1} style={{width: '100%', height: '100%'}} justify="center" align="center">
                                <Upload style={{width: '100%', height: '100%'}}
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                {previewImage && (
                                    <Image
                                        wrapperStyle={{ display: 'none' }}
                                        preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                        }}
                                        src={previewImage}
                                />
                                )}
                            </Flex>
                        :
                            ''
                }
                </div>
                <div className={styles.pokemonDetails}>
                    <div className={styles.pokemonDetails_header}>
                        <div className={styles.pokemonDetails_title}>
                            <h3>{id}</h3>
                            {
                                location.pathname === detailsPath
                                ?
                                    <h3>{name}</h3>
                                :
                                    location.pathname === editPath
                                    ?
                                    <ConfigProvider theme={customAnt}>
                                        <Input showCount maxLength={20} defaultValue={name} placeholder="Nombre del Pokémon" />
                                    </ConfigProvider>
                                    :
                                        ''
                            }

                        </div>
                        <div className={styles.pokemonDetails_buttons}>
                        {
                            location.pathname === detailsPath
                            ?
                                <>
                                    <a className={favorite ? `${styles.pokemonDetails_buttons_favoriteBtn} ${styles.favorite}` : styles.pokemonDetails_buttons_favoriteBtn} onClick={handleClick}>{star}</a>
                                    <a className={styles.pokemonDetails_buttons_editBtn}><EditOutlined /></a>
                                </>
                            :
                                ''
                        }
                        </div>
                    </div>
                    <div className={styles.pokemonDetails_details}>
                        <div className={styles.pokemonDetails_details_traits}>
                            <div className={styles.pokemonDetails_details_traits_item}>
                                <span>Tipo:</span>
                                <aside>
                                {
                                    location.pathname === detailsPath
                                    ?
                                        types.map(type => {
                                            const {value, label} = type;

                                            return(
                                                <span style={{backgroundColor: value, padding: '0 1vw', borderRadius: '0.5vw', color: 'white'}}>{label}</span>
                                            );
                                        })
                                    :
                                        location.pathname === editPath
                                        ?
                                            <ConfigProvider theme={customAnt}>
                                                <Select
                                                    mode="multiple"
                                                    tagRender={tagRender}
                                                    style={{ width: '100%' }}
                                                    options={options}
                                                    placeholder='Seleccione los Tipos'
                                                    maxTagCount={2}
                                                />
                                            </ConfigProvider>
                                        :
                                            ''

                                }
                                </aside>
                            </div>
                            
                            <div className={styles.pokemonDetails_details_traits_item}>
                                <span>Altura:</span>
                                
                                {
                                location.pathname === detailsPath
                                ?
                                    <span>{height}</span>
                                :
                                    location.pathname === editPath
                                    ?
                                        <ConfigProvider theme={customAnt}>
                                            <InputNumber min={1} defaultValue={height} placeholder="Altura" style={{width: inputNumberWidth}} />
                                        </ConfigProvider>
                                    :
                                        ''
                                }
                            </div>
                            <div className={styles.pokemonDetails_details_traits_item}>
                                <span>Peso:</span>
                                {
                                location.pathname === detailsPath
                                ?
                                    <span>{weight}</span>
                                :
                                    location.pathname === editPath
                                    ?
                                        <ConfigProvider theme={customAnt}>
                                            <InputNumber min={1} defaultValue={weight} placeholder="Peso" style={{width: inputNumberWidth}} />
                                        </ConfigProvider>
                                    :
                                        ''
                                }
                            </div>
                        </div>
                        <div className={styles.pokemonDetails_details_stats}>
                            <div className={styles.pokemonDetails_details_traits_item}>
                                <span>Salud:</span>
                                
                                {
                                location.pathname === detailsPath
                                ?
                                    <span>{healthPoints}</span>
                                :
                                    location.pathname === editPath
                                    ?
                                        <ConfigProvider theme={customAnt}>
                                            <InputNumber min={1} defaultValue={weight} placeholder="Salud" style={{width: inputNumberWidth}} />
                                        </ConfigProvider>
                                    :
                                        ''
                                }
                            </div>
                            <div className={styles.pokemonDetails_details_traits_item}>
                                <span>Ataque:</span>
                                
                                {
                                location.pathname === detailsPath
                                ?
                                    <span>{attackPoints}</span>
                                :
                                    location.pathname === editPath
                                    ?
                                        <ConfigProvider theme={customAnt}>
                                            <InputNumber min={1} defaultValue={weight} placeholder="Ataque" style={{width: inputNumberWidth}} />
                                        </ConfigProvider>
                                    :
                                        ''
                                }
                            </div>
                            <div className={styles.pokemonDetails_details_traits_item}>
                                <span>Defensa:</span>
                                
                                {
                                location.pathname === detailsPath
                                ?
                                    <span>{defensePoints}</span>
                                :
                                    location.pathname === editPath
                                    ?
                                        <ConfigProvider theme={customAnt}>
                                            <InputNumber min={1} defaultValue={weight} placeholder="Defensa" style={{width: inputNumberWidth}} />
                                        </ConfigProvider>
                                    :
                                        ''
                                }
                            </div>
                            <div className={styles.pokemonDetails_details_traits_item}>
                                <span>Velocidad:</span>
                                
                                {
                                location.pathname === detailsPath
                                ?
                                    <span>{speedPoints}</span>
                                :
                                    location.pathname === editPath
                                    ?
                                        <ConfigProvider theme={customAnt}>
                                            <InputNumber min={1} defaultValue={weight} placeholder="Velocidad" style={{width: inputNumberWidth}} />
                                        </ConfigProvider>
                                    :
                                        ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.pokemonEvolutions}>
                    {
                        evolutions.map(evolution => {
                            const flecha = evolutions.indexOf(evolution) == 0 ? '' : <ArrowRightOutlined />;
                            return (
                                <>
                                    {flecha}
                                    <Link to=''><img src={evolution} alt="Evolución" /></Link>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            {
                location.pathname === editPath
                ?
                    <div className={styles.editButtons}>
                        <Link to='' className={styles.editButtons_edit} onClick={() => editBtnsClick({
                                titleText: "¿Desea guardar los cambios?",
                                buttonText: "Guardar",
                                successText: "Cambios guardados"
                            })}>Editar</Link>
                        <a className={styles.editButtons_delete} onClick={() => editBtnsClick({
                                titleText: "¿Desea eliminar este Pokémon?",
                                buttonText: "Eliminar",
                                successText: "Se eliminó el Pokémon"
                            })}>Eliminar</a>
                    </div>
                :
                    location.pathname === editPath
                    ?
                        <ConfigProvider theme={customAnt}>
                            <InputNumber min={1} defaultValue={weight} placeholder="Velocidad" style={{width: inputNumberWidth}} />
                        </ConfigProvider>
                    :
                        ''
            }
        </div>
    )
}