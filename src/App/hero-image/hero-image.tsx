import styles from "./hero-image.module.css";



const HeroImage = () => {
    return (
        <div className={styles['hero-image']}>
            {Array.from(new Array(39), (x, i) => i).map(n => (
                <div className={styles["fragment-img"]} data-image={`${n}`} key={n}></div>
            ))}
        </div>
    )
}

export default HeroImage;