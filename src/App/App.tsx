import React from 'react';
import logo from '../images/logo.svg';
import styles from './App.module.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../theming/Theme';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';



function App() {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <div className={styles.app}>
                    <header className={styles.header}>
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

                        <nav className={styles.secondary}>
                            <Link className={`${styles['nav-link']} ${styles['nav-link-home']}`} component={RouterLink} to="/" underline="none" color="inherit" m="0 2rem">
                                <div className={styles.logo}>
                                    <img src={logo} className={styles['logo-image']} alt="logo" />
                                    <Typography variant="h6">Experiments</Typography>
                                </div>
                            </Link>
                        </nav>
                    </header>

                    <div className={styles['hero-image']}/>

                    <main>
                        <Outlet/>
                    </main>
                </div>

                <footer>
                    <span>Patrick Radulian</span>
                </footer>
            </ThemeProvider>
        </React.StrictMode>

    );
}

export default App;
