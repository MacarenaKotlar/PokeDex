import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.scss";

export function NavBar() {
  const location = useLocation();

  return (
    <header>
      <nav className={styles.header_navbar}>
        <ul>
          <li className={location.pathname === "/" ? styles.active : ""}>
            <Link to="/">Inicio</Link>
          </li>
          <li
            className={
              location.pathname.includes("favorites") ? styles.active : ""
            }
          >
            <Link to="/favorites">Favoritos</Link>
          </li>
          <li
            className={
              location.pathname.includes("creation") ? styles.active : ""
            }
          >
            <Link to="/creation">Crear Pokémon</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
