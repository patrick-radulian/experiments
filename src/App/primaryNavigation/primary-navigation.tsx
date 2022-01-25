import { Link, Typography } from "@mui/material";
import { Link as RouterLink} from "react-router-dom";
import styles from "./primary-navigation.module.css";
import logo from "../../images/logo.svg";

const PrimaryNavigation = () => {
    return (
        <nav className={styles.primary}>
            <Link className={styles['nav-link']} component={RouterLink} to="ui-experiments" underline="hover" color="inherit">UI Experiments</Link>

            <Link className={`${styles['nav-link']} ${styles['nav-link-home']}`} component={RouterLink} to="/" underline="none" color="inherit" m="0 2rem">
                <div className={styles.logo}>
                    <img src={logo} className={styles['logo-image']} alt="logo" />
                    <Typography variant="h6">Experiments</Typography>
                </div>
            </Link>

            <Link className={styles['nav-link']} component={RouterLink} to="other-experiments" underline="hover" color="inherit">Other Experiments</Link>
        </nav>
    )
}

export default PrimaryNavigation;