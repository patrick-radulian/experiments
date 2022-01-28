import PrimaryNavigation from "app/primary-navigation/primary-navigation";
import SecondaryNavigation from "app/secondary-navigation/secondary-navigation";
import styles from "./app-header.module.css";

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <PrimaryNavigation/>
            <SecondaryNavigation/>
        </header>
    )
}

export default AppHeader;