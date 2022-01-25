import PrimaryNavigation from "../primaryNavigation/primary-navigation";
import SecondaryNavigation from "../secondaryNavigation/secondary-navigation";
import styles from "./app-header.module.css"

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <PrimaryNavigation/>
            <SecondaryNavigation/>
        </header>
    )
}

export default AppHeader;