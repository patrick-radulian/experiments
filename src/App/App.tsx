import React from 'react';
import styles from './App.module.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../theming/Theme';
import { Outlet } from 'react-router-dom';
import AppHeader from './app-header/app-header';


function App() {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
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
