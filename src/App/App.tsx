import React from 'react';
import styles from './App.module.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../theming/Theme';
import { Outlet } from 'react-router-dom';
import AppHeader from './appHeader/app-header';
import HeroImage from './heroImage/hero-image';



function App() {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <div className={styles.app}>
                    <AppHeader/>

                    <HeroImage/>

                    <main>
                        <Outlet/>
                    </main>

                    <footer>
                        <span>Patrick Radulian</span>
                    </footer>
                </div>

                <div className={styles['app-background']}/>
            </ThemeProvider>
        </React.StrictMode>

    );
}

export default App;
