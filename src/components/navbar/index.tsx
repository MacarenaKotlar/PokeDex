import styles from './index.module.scss';
import type { MenuProps } from 'antd';
import { Select } from 'antd';

export function NavBar(){
  const orderBySelectOptions = [
    {value: 'Por Defecto', label: 'Por Defecto'},
    {value: 'De la A a la Z', label: 'De la A a la Z'},
    {value: 'De la Z a la A', label: 'De la Z a la A'},
    {value: 'Por Ataque', label: 'Por Ataque'}
  ];

  const filterSelectOptions = [
    {value: 'Por Defecto', label: 'Por Defecto'},
    {value: 'Por Tipo', label: 'Por Tipo'},
    {value: 'Pokemones Existentes', label: 'Pokemones Existentes'},
    {value: 'Creador por el Usuario', label: 'Creador por el Usuario'}
  ];

  const userSelectOptions = [
    {value: 'Favoritos', label: 'Favoritos'},
    {value: 'Crear Pokémon', label: 'Crear Pokémon'}
  ];
      
  return(
      <nav className={styles.header_navbar}>
          <ul>
              <li><a>Inicio</a></li>
              <li>
                <span>Ordenar</span>
                <Select style={{width: '100%'}} options={orderBySelectOptions}>
                </Select>
              </li>

              <li>
              <span>Filtrar</span>
                <Select style={{width: '100%'}} options={filterSelectOptions}>
                </Select>
              </li>

              <li>
              <span>Usuario</span>
                <Select style={{width: '100%'}} options={userSelectOptions}>
                </Select>
              </li>
          </ul>
      </nav>
  )
}