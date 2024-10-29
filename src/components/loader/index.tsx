import styles from "./index.module.scss";

export function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <span>Cargando</span>
      <img src="/PokeBall.png" alt="PokeBall" />
    </div>
  );
}
