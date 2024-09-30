import { useState } from "react";
import styles from "./index.module.scss";
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

interface ICard{
    id: number;
    name: string;
    image: string;
    attackPoints: number;
}

export function Card({ id, name, image, attackPoints }: ICard){
    const [favorite, setFavorite] = useState(false);

    const star = favorite ? <StarFilled /> : <StarOutlined />
    
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setFavorite(!favorite);
    }
    
    return(
        <Link to={`/detail/${id}`}>
            <div className={styles.pokemonCard}>
                <div className={styles.pokemonCard_header}>
                    <div className={styles.pokemonCard_title}>
                        <h3>{id}</h3>
                        <h3>{name}</h3>
                    </div>
                    <div className={styles.pokemonCard_buttons}>
                        <a className={favorite ? `${styles.pokemonCard_buttons_favoriteBtn} ${styles.favorite}` : styles.pokemonCard_buttons_favoriteBtn} onClick={handleClick}>{star}</a>
                        <Link to={`/edit/${id}`} className="pokemonCard-buttons-editBtn"><EditOutlined /></Link>
                    </div>
                </div>
                <div className={styles.pokemonCard_main}>
                    <img src={image} alt="Imagen"/>
                    <div className={styles.pokemonCard_attack}>
                        <span>Ataque:</span>
                        <span>{attackPoints}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}