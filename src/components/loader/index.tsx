import styles from "./index.module.scss";

export function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader} />
    </div>
  );
}
