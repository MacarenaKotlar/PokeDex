import { Select } from 'antd';
import styles from './index.module.scss';

export function SideContainer(){
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
    
    return(
        <div className={styles.sideContainer}>
            <ul>
                <li>
                    <span>Ordenar</span>
                    <Select style={{width: '100%'}} defaultValue='Por Defecto' options={orderBySelectOptions}>
                    </Select>
                </li>

                <li>
                    <span>Filtrar</span>
                    <Select style={{width: '100%'}} defaultValue='Por Defecto' options={filterSelectOptions}>
                    </Select>
                </li>
            </ul>
        </div>
    )
}