import { Link } from "react-router-dom";
import styles from "./index.module.scss";

export function NavBar() {
  return (
    <nav className={styles.header_navbar}>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/favorites">Favoritos</Link>
        </li>
        <li>
          <Link to="/creation">Crear Pokémon</Link>
        </li>
      </ul>
    </nav>
  );
}
