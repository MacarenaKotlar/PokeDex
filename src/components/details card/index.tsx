import { useState } from "react";
import styles from "./index.module.scss";
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';

interface IDetailsCard{
    id: number;
    name: string;
    image: string;
    types: string[];
    height: number;
    weight: number;
    healthPoints: number;
    attackPoints: number;
    defensePoints: number;
    speedPoints: number
}

export function DetailsCard({ id, name, image, types, height, weight, healthPoints, attackPoints, defensePoints, speedPoints }: IDetailsCard){
    const [favorite, setFavorite] = useState(false);

    const star = favorite ? <StarFilled /> : <StarOutlined />
    
    const handleClick = () => {
        setFavorite(!favorite);
    }

    return(
        <div className={styles.detailsContainer}>
            <div className={styles.pokemonImage}></div>
            <div className={styles.pokemonDetails}>
                <div className={styles.pokemonDetails_title}></div>
                <div className={styles.pokemonDetails_details}></div>
            </div>
            <div className={styles.pokemonEvolutions}></div>
        </div>
    )
}