import styles from './index.module.scss';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

export function NavBar(){
    const orderBy: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Por Defecto
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              De la A a la Z
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              De la A a la Z
            </a>
          ),
        },
        {
          key: '4',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Por Ataque
            </a>
          ),
        }
      ];

      const filter: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Por Defecto
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Por Tipo
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Pokemones Existentes
            </a>
          ),
        },
        {
          key: '4',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Creador por el Usuario
            </a>
          ),
        }
      ];

      const user: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Favoritos
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Crear Pokémon
            </a>
          ),
        }
      ];
      
    return(
        <nav className={styles.header_navbar}>
            <ul>
                <li><a>Inicio</a></li>
                <li><a>
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown menu={{ items:orderBy }} placement="bottom">
                      <Button>Ordenar</Button>
                    </Dropdown>
                  </Space>
                </Space>
              </a></li>

              <li><a>
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown menu={{ items:filter }} placement="bottom">
                      <Button>Filtrar</Button>
                    </Dropdown>
                  </Space>
                </Space>
              </a></li>

              <li><a>
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown menu={{ items:user }} placement="bottom">
                      <Button>Usuario</Button>
                    </Dropdown>
                  </Space>
                </Space>
              </a></li>
            </ul>
        </nav>
    )
}