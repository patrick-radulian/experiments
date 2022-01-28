import React from 'react';
import AppHeader from './app-header/app-header';
import { ThemeProvider } from '@emotion/react';
import { AppTheme } from '../theming/Theme';
import { Outlet } from 'react-router-dom';
import styles from "./app.module.css";

const App = () => {
    return (
        <React.StrictMode>
            <ThemeProvider theme={AppTheme}>
                <div className={styles.app}>
                    <AppHeader/>

                    <main>
                        <Outlet/>
                    </main>

                    <footer>
                        <span>Patrick Radulian</span>
                    </footer>
                </div>
            </ThemeProvider>
        </React.StrictMode>

    );
}

export default App;
