import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import MultiSelect from './components/MultiSelect/MultiSelect';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theming/Theme';
import { Card } from '@mui/material';
import MultiSelectLabel from './components/MultiSelect/MultiSelectLabel';
import { dataLarge } from './components/MultiSelect/data-large';
import { dataShort } from './components/MultiSelect/data-short';


function App() {
    const multiSelectRef_A = React.useRef<HTMLDivElement | null>(null);
    const multiSelectRef_B = React.useRef<HTMLDivElement | null>(null);

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <div className={styles.app}>
                    <header className={styles['app-header']}>
                        <img src={logo} className={styles['app-logo']} alt="logo" />
                    </header>

                    <hr className={styles.separator}/>

                    <main>
                        <Card className={styles.card}>
                            <MultiSelectLabel multiSelect={multiSelectRef_A}>Group Members (few options)</MultiSelectLabel>
                            <MultiSelect options={dataShort} ref={multiSelectRef_A} styles={{width: "20rem"}}/>
                        </Card>

                        <Card className={styles.card}>
                            <MultiSelectLabel multiSelect={multiSelectRef_B}>Group Members (many options)</MultiSelectLabel>
                            <MultiSelect options={dataLarge} ref={multiSelectRef_B} styles={{width: "20rem"}}/>
                        </Card>
                    </main>
                </div>
            </ThemeProvider>
        </React.StrictMode>

    );
}

export default App;
