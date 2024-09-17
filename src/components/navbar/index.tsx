import styles from './index.module.scss';

export function NavBar(){
      
  return(
      <nav className={styles.header_navbar}>
          <ul>
              <li><a>Inicio</a></li>
              <li><a>Favoritos</a></li>
              <li><a>Crear Pokémon</a></li>
          </ul>
      </nav>
  )
}