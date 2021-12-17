import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import MultiSelect from './components/MultiSelect/MultiSelect';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theming/Theme';


function App() {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <div className={styles.app}>
                    <header className={styles['app-header']}>
                        <img src={logo} className={styles['app-logo']} alt="logo" />
                    </header>

                    <hr className={styles.separator}/>

                    <main>
                        <MultiSelect/>
                    </main>
                </div>
            </ThemeProvider>
        </React.StrictMode>

    );
}

export default App;
