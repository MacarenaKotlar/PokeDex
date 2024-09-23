import { useState } from "react";
import styles from "./index.module.scss";
import { StarOutlined, StarFilled, EditOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

interface IDetailsCard{
    id: number;
    name: string;
    image: string;
    types: object[];
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

    return(
        <div className={styles.detailsContainer}>
            <div className={styles.pokemonImage}>
                <img src={image} alt="Imagen" />
            </div>
            <div className={styles.pokemonDetails}>
                <div className={styles.pokemonDetails_header}>
                    <div className={styles.pokemonDetails_title}>
                        <h3>{id}</h3>
                        <h3>{name}</h3>
                    </div>
                    <div className={styles.pokemonDetails_buttons}>
                        <a className={favorite ? `${styles.pokemonDetails_buttons_favoriteBtn} ${styles.favorite}` : styles.pokemonDetails_buttons_favoriteBtn} onClick={handleClick}>{star}</a>
                        <a className={styles.pokemonDetails_buttons_editBtn}><EditOutlined /></a>
                    </div>
                </div>
                <div className={styles.pokemonDetails_details}>
                    <div className={styles.pokemonDetails_details_traits}>
                        <div>
                            <span>Tipo:</span>
                            <aside>
                            {
                                types.map(type => {
                                    const {value, label} = type;

                                    return(
                                        <span style={{backgroundColor: value, padding: '0 1vw', borderRadius: '0.5vw', color: 'white'}}>{label}</span>
                                    )
                                })
                            }
                            </aside>
                        </div>
                        
                        <div>
                            <span>Altura:</span>
                            <span>{height}</span>
                        </div>
                        <div>
                            <span>Peso:</span>
                            <span>{weight}</span>
                        </div>
                    </div>
                    <div className={styles.pokemonDetails_details_stats}>
                        <div>
                            <span>Salud:</span>
                            <span>{healthPoints}</span>
                        </div>
                        <div>
                            <span>Ataque:</span>
                            <span>{attackPoints}</span>
                        </div>
                        <div>
                            <span>Defensa:</span>
                            <span>{defensePoints}</span>
                        </div>
                        <div>
                            <span>Velocidad:</span>
                            <span>{speedPoints}</span>
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
    )
}