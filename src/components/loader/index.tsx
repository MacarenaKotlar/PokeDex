import styles from "./index.module.scss";
import { Skeleton } from "antd";

export function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader} />
    </div>
  );
}

export function HomeLoader({ cards }: { cards: number }) {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div className={styles.pokemonCard} key={i}>
        <div className={styles.pokemonCard_header}>
          <div className={styles.pokemonCard_title}>
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: "100%" }}
            />
          </div>
          <div className={styles.pokemonCard_buttons}>
            <Skeleton.Avatar active size="small" />
          </div>
        </div>
        <div className={styles.pokemonCard_main}>
          <Skeleton.Image active className="skeleton" />
          <div className={styles.pokemonCard_attack}>
            <div className={styles.skeletonContainer}>
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 1, width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    ));
}
