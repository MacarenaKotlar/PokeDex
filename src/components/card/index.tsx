import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { JSONAPIService } from "../../services/api/JSONAPIService";
import { IPokemon } from "../../mock";
import { PokemonUseCases } from "../../useCases/pokemonsUseCases";

interface ICard {
  id: string;
  name: string;
  image: string;
  attackPoints: number;
  source: string;
  pokemon: IPokemon;
  onFavoritesChange?: () => void;
}

export function Card({
  id,
  name,
  image,
  attackPoints,
  source,
  pokemon,
  onFavoritesChange,
}: ICard) {
  const [favorite, setFavorite] = useState(false);

  const pokemonInFavorites = async (pokemon: IPokemon) => {
    const pokemons: IPokemon[] = await JSONAPIService.getFavorites();
    const isPokemonInFavorites = pokemons.some((p) => p.id === pokemon.id);
    setFavorite(isPokemonInFavorites);
  };

  useEffect(() => {
    if (pokemon) pokemonInFavorites(pokemon);
  }, [pokemon]);

  const star = favorite ? <StarFilled /> : <StarOutlined />;

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    favorite
      ? PokemonUseCases.deleteFavorite(pokemon)
      : PokemonUseCases.postFavorite(pokemon);
    setFavorite(!favorite);
    if (onFavoritesChange) onFavoritesChange();
  };

  return (
    <Link to={`/detail/${source}/${id}`}>
      <div className={styles.pokemonCard}>
        <div className={styles.pokemonCard_header}>
          <div className={styles.pokemonCard_title}>
            <h3>{id}</h3>
            <h3 className={styles.pokemon_name}>{name}</h3>
          </div>
          <div className={styles.pokemonCard_buttons}>
            <a
              className={
                favorite
                  ? `${styles.pokemonCard_buttons_favoriteBtn} ${styles.favorite}`
                  : styles.pokemonCard_buttons_favoriteBtn
              }
              onClick={handleClick}
            >
              {star}
            </a>
            {source === "local" && (
              <Link
                to={`/edit/${source}/${id}`}
                className="pokemonCard-buttons-editBtn"
              >
                <EditOutlined />
              </Link>
            )}
          </div>
        </div>
        <div className={styles.pokemonCard_main}>
          <img src={image} alt={name} />
          <div className={styles.pokemonCard_attack}>
            <span>Ataque:</span>
            <span>{attackPoints}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
